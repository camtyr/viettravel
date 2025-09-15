import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'Admin' | 'User';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { token, role } = useAuth();

  // Nếu chưa login -> chuyển hướng về login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có requiredRole nhưng user không đúng quyền -> chuyển hướng về Home
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
