import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'Admin' | 'User';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { token, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>; 

  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;
  if (requiredRole && role !== requiredRole) return <div>Bạn không có quyền truy cập trang này</div>;

  return <>{children}</>;
};

export default ProtectedRoute;
