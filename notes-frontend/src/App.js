import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ApiTest from "./components/ApiTest";

function App() {
  // Log environment variables for debugging
  useEffect(() => {
    console.log("Environment:", process.env.NODE_ENV);
    console.log("API URL:", process.env.REACT_APP_API_URL || "http://localhost:5000/api");
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/api-test" element={<ApiTest />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
