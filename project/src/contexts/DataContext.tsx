// src/contexts/DataContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import api from '../BaseUrl';
import * as signalR from '@microsoft/signalr';

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
  destinationReviews: Review[]; // reviews API
  reviews: Review[];
  comments: Record<number, ReviewComment[]>;
  publicDestinations: Destination[];
  fetchDestinations: () => Promise<void>;
  fetchMyDestinations: () => Promise<void>;
  fetchPublicDestinations: () => Promise<void>;
  searchDestinations: (keyword: string) => Promise<void>;
  addDestination: (data: { name: string; location: string; category: string; description: string; files: File[] }) => Promise<void>;
  updateMyDestination: (id: number, data: { name: string; location: string; category: string; description: string; file?: File }) => Promise<void>;
  updateDestination: (id: number, action: 'Approve' | 'Reject') => Promise<void>;
  deleteDestination: (id: number) => Promise<void>;
  deleteMyDestination: (id: number) => Promise<void>;
  getDestinationReviews: (destinationId: number) => Promise<void>;
  addReview: (destinationId: number, rating: number, comment: string) => Promise<void>;
  deleteReview: (destinationId: number) => Promise<void>;
}
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, role } = useAuth();
  const [publicDestinations, setPublicDestinations] = useState<Destination[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comments, setComments] = useState<Record<number, ReviewComment[]>>({});
  const [myOwnDestinations, setMyDestinations] = useState<Destination[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [destinationReviews, setDestinationReviews] = useState<any[]>([]); 

  const axiosInstance = axios.create({
    baseURL: api.defaults.baseURL,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  const publicAxios = axios.create({ baseURL: api.defaults.baseURL });

  // ------------------ HELPER: MAP IMAGE ------------------
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapDestinationImages = (dest: any): Destination => ({
    ...dest,
    urlPicture: dest.imageUrls ?? [],
  });

  // ------------------ API FETCH ------------------
  const fetchPublicDestinations = async () => {
    try {
      const res = await publicAxios.get<Destination[]>('/Destinations/approved');
      setPublicDestinations(res.data.map(mapDestinationImages));
    } catch (err) {
      console.error('Fetch public destinations failed:', err);
    }
  };

  const fetchDestinations = async () => {
    if (!token || role !== 'Admin') return;
    try {
      const res = await axiosInstance.get<Destination[]>('/Admin/destinations/all');
      setDestinations(res.data.map(mapDestinationImages));
    } catch (err) {
      console.error('Fetch admin destinations failed:', err);
    }
  };

  const fetchMyDestinations = async () => {
    if (!token) return;
    try {
      const res = await axiosInstance.get<Destination[]>('/Destinations/my');
      setMyDestinations(res.data.map(mapDestinationImages));
    } catch (err) {
      console.error('Fetch my destinations failed:', err);
    }
  };

  const searchDestinations = async (keyword: string) => {
    if (!token) return;
    try {
      const res = await axiosInstance.get<Destination[]>(`/Destinations/search?keyword=${encodeURIComponent(keyword)}`);
      setDestinations(res.data.map(mapDestinationImages));
    } catch (err) {
      console.error('Search destinations failed:', err);
    }
  };

  // ------------------ CRUD ------------------
  const addDestination = async (data: { name: string; location: string; category: string; description: string; files: File[] }) => {
    if (!token || !data.files.length) return;
    try {
      const formData = new FormData();
      formData.append("Name", data.name);
      formData.append("Location", data.location);
      formData.append("Category", data.category);
      formData.append("Description", data.description);
      data.files.forEach(file => formData.append("Files", file));

      const res = await axiosInstance.post<Destination>("/Destinations", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
      });

      setMyDestinations(prev => [...prev, mapDestinationImages(res.data)]);
    } catch (err) {
      console.error("Add destination failed:", err);
    }
  };

  const updateMyDestination = async (id: number, data: { name: string; location: string; category: string; description: string; file?: File }) => {
    if (!token) return;
    try {
      const formData = new FormData();
      formData.append("Name", data.name);
      formData.append("Location", data.location);
      formData.append("Category", data.category);
      formData.append("Description", data.description);
      if (data.file) formData.append("File", data.file);

      const res = await axiosInstance.put<Destination>(`/Destinations/my/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
      });

      setMyDestinations(prev => prev.map(d => (d.id === id ? mapDestinationImages(res.data) : d)));
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

  // ------------------ Reviews ------------------
  const getDestinationReviews = async (destinationId: number) => {
      try {
        const response = await api.get(`/Reviews/destination/${destinationId}`);
        setDestinationReviews(response.data);
      } catch (error) {
        console.error("Fetch reviews failed:", error);
      }
    };
  
    // API: thêm review mới
    const addReview = async (destinationId: number, rating: number, comment: string) => {
      if (!token) return;
      try {
        await axiosInstance.post(`/Reviews/destination/${destinationId}`, { rating, comment });
        await getDestinationReviews(destinationId); // load lại reviews
        await fetchDestinations(); // update rating trung bình
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

  // ------------------ SIGNALR ------------------
  useEffect(() => {
    if (!token) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${api.defaults.baseURL}/hubs/data`, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log('SignalR connected'))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => console.error('SignalR connection error:', err));

    connection.on('DestinationUpdated', (updated: Destination) => {
      setPublicDestinations(prev => {
        const idx = prev.findIndex(d => d.id === updated.id);
        if (idx >= 0) prev[idx] = updated;
        else prev.push(updated);
        return [...prev];
      });
      setDestinations(prev => {
        const idx = prev.findIndex(d => d.id === updated.id);
        if (idx >= 0) prev[idx] = updated;
        else prev.push(updated);
        return [...prev];
      });
      setMyDestinations(prev => {
        const idx = prev.findIndex(d => d.id === updated.id);
        if (idx >= 0) prev[idx] = updated;
        return [...prev];
      });
    });

    connection.on('ReviewUpdated', (updated: Review) => {
      setReviews(prev => {
        const idx = prev.findIndex(r => r.id === updated.id);
        if (idx >= 0) prev[idx] = updated;
        else prev.push(updated);
        return [...prev];
      });
    });

    connection.on('CommentUpdated', (updated: ReviewComment) => {
      setComments(prev => {
        const prevComments = prev[updated.reviewId] || [];
        const idx = prevComments.findIndex(c => c.id === updated.id);
        if (idx >= 0) prevComments[idx] = updated;
        else prevComments.push(updated);
        return { ...prev, [updated.reviewId]: [...prevComments] };
      });
    });

    return () => {
      connection.stop();
    };
  }, [token]);

  // ------------------ INITIAL FETCH ------------------
  useEffect(() => {
    fetchPublicDestinations();
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchDestinations();
    fetchMyDestinations();
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
        deleteMyDestination,
        getDestinationReviews,
        addReview,
        deleteReview,
        destinationReviews, // reviews API
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
