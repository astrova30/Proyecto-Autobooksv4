import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthorization } from '../Context/AuthContext'; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthorization();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
