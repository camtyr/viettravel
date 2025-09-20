import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import api from '../BaseUrl';

export interface Destination {
  id: number;
  name: string;
  location: string;
  category: string;
  urlPicture: string[];
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
  id: number | null;
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
  addDestination: (data: {
    name: string;
    location: string;
    category: string;
    description: string;
    files: File[];
  }) => Promise<void>;
  updateMyDestination: (id: number, data: {
    name: string;
    location: string;
    category: string;
    description: string;
    file?: File;
  }) => Promise<void>;
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
  deleteMyDestination: (id: number) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, role } = useAuth();
  const [publicDestinations, setPublicDestinations] = useState<Destination[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comments, setComments] = useState<Record<number, ReviewComment[]>>({});
  const [myOwnDestinations, setMyDestinations] = useState<Destination[]>([]);

  const axiosInstance = axios.create({
    baseURL: api.defaults.baseURL,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  const publicAxios = axios.create({ baseURL: api.defaults.baseURL });

  // ------------------ Public Destinations ------------------
  const fetchPublicDestinations = async () => {
    try {
      const res = await publicAxios.get<Destination[]>('/Destinations/approved');
      // map imageUrls => urlPicture
      const mapped = res.data.map(dest => ({
        ...dest,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        urlPicture: (dest as any).imageUrls ?? [],
      }));
      setPublicDestinations(mapped);
    } catch (err) {
      console.error('Fetch public destinations failed:', err);
    }
  };

  // ------------------ Admin Destinations ------------------
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

  // ------------------ User Destinations ------------------
  const addDestination = async (data: {
    name: string;
    location: string;
    category: string;
    description: string;
    files: File[];
  }) => {
    if (!token) return;

    if (!data.files || data.files.length === 0) {
      console.error('No files provided');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Name", data.name);
      formData.append("Location", data.location);
      formData.append("Category", data.category);
      formData.append("Description", data.description);

      data.files.forEach((file) => formData.append("Files", file));

      const res = await axiosInstance.post<Destination>("/Destinations", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      setMyDestinations(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Add destination failed:", err);
    }
  };

  const updateMyDestination = async (id: number, data: {
    name: string;
    location: string;
    category: string;
    description: string;
    file?: File;
  }) => {
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("Name", data.name);
      formData.append("Location", data.location);
      formData.append("Category", data.category);
      formData.append("Description", data.description);

      if (data.file) {
        formData.append("File", data.file);
      }

      const res = await axiosInstance.put<Destination>(`/Destinations/my/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      setMyDestinations(prev => prev.map(d => (d.id === id ? res.data : d)));
    } catch (err) {
      console.error("Update my destination failed:", err);
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

  const deleteMyDestination = async (id: number) => {
    if (!token) return;
    try {
      await axiosInstance.delete(`/Destinations/my/${id}`);
      setMyDestinations(prev => prev.filter(d => d.id !== id));
      setReviews(prev => prev.filter(r => r.destinationId !== id));
    } catch (err) {
      console.error('Delete my destination failed:', err);
    }
  };

  const fetchMyDestinations = async () => {
    if (!token) return;
    try {
      const res = await axiosInstance.get<Destination[]>('/Destinations/my');
      setMyDestinations(res.data);
    } catch (err) {
      console.error('Fetch my destinations failed:', err);
    }
  };

  // ------------------ Reviews ------------------
  const getDestinationReviews = async (destinationId: number) => {
    try {
      const response = await api.get(`/reviews/destination/${destinationId}`);
      setReviews(prev => {
        const filtered = prev.filter(r => r.destinationId !== destinationId);
        return [...filtered, ...response.data];
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách review:", error);
      return [];
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

  // ------------------ Effects ------------------
  useEffect(() => {
    fetchPublicDestinations();
  }, []);

  useEffect(() => {
    if (token) {
      fetchDestinations();
      fetchMyDestinations();
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
        updateMyDestination,
        updateDestination,
        deleteDestination,
        getDestinationReviews,
        addReview,
        deleteReview,
        fetchComments,
        addComment,
        updateComment,
        deleteComment,
        deleteMyDestination
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
