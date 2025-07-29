// src/views/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

interface ProtectedRouteProps {
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo = "/login" }) => {
  const { user, loading } = useAuth();

  // Optionally, you can show a loading spinner while checking auth
  if (loading) return <div>Loading...</div>;

  // If no user, redirect to login
  if (!user) return <Navigate to={redirectTo} replace />;

  // Otherwise, render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
