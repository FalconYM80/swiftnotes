import React, { useState } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import { useAuth } from "../auth";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const { user, logout } = useAuth();

  const reloadNotes = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 mb-6 rounded-lg max-w-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-blue-600">Notes App</h2>
        </div>
        <div className="flex items-center">
          <span className="mr-4 text-gray-700">Hello, {user?.name || "User"}</span>
          <button
            onClick={logout}
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