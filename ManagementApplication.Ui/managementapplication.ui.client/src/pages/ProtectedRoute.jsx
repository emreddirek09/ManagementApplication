import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('jwtToken');
  const userRole = localStorage.getItem('userRole');
   
  if (!token || !allowedRoles.includes(userRole)) {
    return <Navigate to="/Login" />;
  }

  // Yetkili kullanıcıyı yönlendir
  return children;
};

export default ProtectedRoute;
