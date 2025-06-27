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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 mb-6 rounded-lg max-w-3xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <h2 className="text-xl font-semibold text-blue-600">Notes App</h2>
        </div>
        <div className="flex items-center">
          <span className="mr-4 text-gray-700">Hello, {userName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-4 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Your Notes
        </h1>
        <div className="border-b pb-6 mb-6">
          <NoteForm onNoteAdded={reloadNotes} />
        </div>
        <NoteList key={refresh} />
      </div>
    </div>
  );
};

export default Home; 