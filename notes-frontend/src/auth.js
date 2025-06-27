import React, { createContext, useState, useEffect, useContext } from "react";
import { login as apiLogin, register as apiRegister } from "./api";

// Create authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      const { data } = await apiLogin({ email, password });
      
      // Save token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setUser(data.user);
      return data;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.msg || `Login failed: ${err.message}`);
      throw err;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      setError(null);
      console.log("Registering user:", { name, email });
      const response = await apiRegister({ name, email, password });
      console.log("Registration response:", response);
      return response;
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.msg || `Registration failed: ${err.message}`);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
