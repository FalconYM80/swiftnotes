import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // If still loading auth state, show nothing (or could show a loading spinner)
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute; 