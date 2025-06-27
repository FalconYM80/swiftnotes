import React, { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (!storedUser || !token) {
      navigate("/login");
    }
  }, [navigate]);

  const reloadNotes = () => setRefresh(!refresh);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get user data from localStorage if not available in context
  const userData = user || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  const userName = userData?.name || "User";

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 mb-6 rounded-lg max-w-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-blue-600">Notes App</h2>
        </div>
        <div className="flex items-center">
          <span className="mr-4 text-gray-700">Hello, {userName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Your Notes 📝
        </h1>
        <NoteForm onNoteAdded={reloadNotes} />
        <NoteList key={refresh} />
      </div>
    </div>
  );
};

export default Home; 