import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check for token in localStorage directly
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
    
    setCheckingAuth(false);
  }, []);

  // If still loading auth state or checking localStorage, show loading
  if (loading || checkingAuth) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If not authenticated via context or localStorage, redirect to login
  if (!isAuthenticated && !isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute; 