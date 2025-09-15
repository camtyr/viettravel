// src/contexts/DataContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

export interface Destination {
  id: number;
  name: string;
  location: string;
  category: string;
  urlPicture: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  rating: number;
  ratingCount: number;
  createdDate: string;
  createdById: number | null;
}

export interface Review {
  id: number;
  destinationId: number;
  userId: number;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ReviewComment {
  id: number |null;
  reviewId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

interface DataContextType {
  destinations: Destination[];
  myOwnDestinations: Destination[];
  reviews: Review[];
  comments: Record<number, ReviewComment[]>;
  fetchDestinations: () => Promise<void>;
  fetchMyDestinations: () => Promise<void>; 
  searchDestinations: (keyword: string) => Promise<void>;
  addDestination: (data: Omit<Destination, 'id' | 'createdDate' | 'rating' | 'ratingCount' | 'status'> & { status?: 'Pending' | 'Approved' }) => Promise<void>;
  updateDestination: (id: number, action: 'Approve' | 'Reject') => Promise<void>;
  deleteDestination: (id: number) => Promise<void>;
  getDestinationReviews: (destinationId: number) => Promise<void>;
  addReview: (destinationId: number, rating: number, comment: string) => Promise<void>;
  deleteReview: (destinationId: number) => Promise<void>;
  fetchComments: (reviewId: number) => Promise<void>;
  addComment: (reviewId: number, content: string) => Promise<void>;
  updateComment: (commentId: number, content: string) => Promise<void>;
  deleteComment: (commentId: number) => Promise<void>;
  publicDestinations: Destination[];
  fetchPublicDestinations: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, role } = useAuth(); // role: 'Admin' | 'User'
  const [publicDestinations, setPublicDestinations] = useState<Destination[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comments, setComments] = useState<Record<number, ReviewComment[]>>({});
  const [myOwnDestinations, setMyDestinations] = useState<Destination[]>([]);

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  const publicAxios = axios.create({
    baseURL: 'http://localhost:5000/api',
  });

  // ------------------ Public Destinations (No token) ------------------
  const fetchPublicDestinations = async () => {
    try {
      const res = await publicAxios.get<Destination[]>('/Destinations/approved');
      setPublicDestinations(res.data);
    } catch (err) {
      console.error('Fetch public destinations failed:', err);
    }
  };

  // ------------------ Destinations ------------------
  const fetchDestinations = async () => {
     if (!token || role !== 'Admin') return;
    try {
      const res = await axiosInstance.get<Destination[]>('/Admin/destinations/all');
      setDestinations(res.data);
    } catch (err) {
      console.error('Fetch admin destinations failed:', err);
    }
  };

  const searchDestinations = async (keyword: string) => {
    if (!token) return;
    try {
      const res = await axiosInstance.get<Destination[]>(`/Destinations/search?keyword=${encodeURIComponent(keyword)}`);
      setDestinations(res.data);
    } catch (err) {
      console.error('Search destinations failed:', err);
    }
  };

  const addDestination = async (data: Omit<Destination, 'id' | 'createdDate' | 'rating' | 'ratingCount' | 'status'> & { status?: 'Pending' | 'Approved' }) => {
    if (!token) return;
    try {
      const res = await axiosInstance.post<Destination>('/Destinations', {
        name: data.name,
        location: data.location,
        category: data.category,
        urlPicture: data.urlPicture,
        description: data.description,
      });
      setDestinations(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Add destination failed:', err);
    }
  };

  const updateDestination = async (id: number, action: 'Approve' | 'Reject') => {
    if (!token) return;
    try {
      await axiosInstance.post(`/Admin/destinations/${id}/${action}`);
      setDestinations(prev =>
        prev.map(d => (d.id === id ? { ...d, status: action === 'Approve' ? 'Approved' : 'Rejected' } : d))
      );
    } catch (err) {
      console.error(`${action} destination failed:`, err);
    }
  };

  const deleteDestination = async (id: number) => {
    if (!token) return;
    try {
      await axiosInstance.delete(`/Admin/destinations/${id}`);
      setDestinations(prev => prev.filter(d => d.id !== id));
      setReviews(prev => prev.filter(r => r.destinationId !== id));
    } catch (err) {
      console.error('Delete destination failed:', err);
    }
  };

  // ------------------ Reviews ------------------
  const getDestinationReviews = async (destinationId: number) => {
    try {
      const res = await publicAxios.get<Review[]>(`/Reviews/destination/${destinationId}`);
      setReviews(prev => {
        const filtered = prev.filter(r => r.destinationId !== destinationId);
        return [...filtered, ...res.data];
      });
    } catch (err) {
      console.error('Fetch destination reviews failed:', err);
    }
  };

  const addReview = async (destinationId: number, rating: number, comment: string) => {
    if (!token) return;
    try {
      await axiosInstance.post(`/Reviews/destination/${destinationId}`, { rating, comment });
      await getDestinationReviews(destinationId);
      await fetchDestinations();
    } catch (err) {
      console.error('Add review failed:', err);
    }
  };

  const deleteReview = async (destinationId: number) => {
    if (!token) return;
    try {
      await axiosInstance.delete(`/Reviews/destination/${destinationId}`);
      await getDestinationReviews(destinationId);
      await fetchDestinations();
    } catch (err) {
      console.error('Delete review failed:', err);
    }
  };

  // ------------------ Comments ------------------
  const fetchComments = async (reviewId: number) => {
    try {
      const res = await publicAxios.get<ReviewComment[]>(`/Reviews/${reviewId}/comments`);
      setComments(prev => ({ ...prev, [reviewId]: res.data }));
    } catch (err) {
      console.error('Fetch comments failed:', err);
    }
  };

  const addComment = async (reviewId: number, content: string) => {
    if (!token) return;
    try {
      await axiosInstance.post(`/Reviews/${reviewId}/comments`, { content });
      await fetchComments(reviewId);
    } catch (err) {
      console.error('Add comment failed:', err);
    }
  };

  const updateComment = async (commentId: number, content: string) => {
    if (!token) return;
    try {
      await axiosInstance.put(`/Reviews/comments/${commentId}`, { content });
      Object.keys(comments).forEach(rid => fetchComments(Number(rid)));
    } catch (err) {
      console.error('Update comment failed:', err);
    }
  };

  const deleteComment = async (commentId: number) => {
    if (!token) return;
    try {
      await axiosInstance.delete(`/Reviews/comments/${commentId}`);
      Object.keys(comments).forEach(rid => fetchComments(Number(rid)));
    } catch (err) {
      console.error('Delete comment failed:', err);
    }
  };
   // ------------------ My Destinations ------------------
  const fetchMyDestinations = async () => {
    if (!token) return;
    try {
      const res = await axiosInstance.get<Destination[]>('/Destinations/my');
      setMyDestinations(res.data);
    } catch (err) {
      console.error('Fetch my destinations failed:', err);
    }
  };
  useEffect(() => {
    fetchPublicDestinations();
  }, []);

  useEffect(() => {
    if (token) {
      fetchDestinations();
      fetchMyDestinations(); // <-- gọi API my destinations khi có token
    }
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        destinations,
        myOwnDestinations,
        publicDestinations,
        fetchPublicDestinations,
        fetchMyDestinations,
        reviews,
        comments,
        fetchDestinations,
        searchDestinations,
        addDestination,
        updateDestination,
        deleteDestination,
        getDestinationReviews,
        addReview,
        deleteReview,
        fetchComments,
        addComment,
        updateComment,
        deleteComment,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
