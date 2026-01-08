import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const RoleGuard = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();

  if (!allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleGuard;
