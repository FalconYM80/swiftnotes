import React, { useState } from "react";
import { createNote } from "../api";

const NoteForm = ({ onNoteAdded }) => {
  const [note, setNote] = useState({ title: "", content: "", color: "#fff8dc" });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.title.trim()) return;
    await createNote(note);
    setNote({ title: "", content: "", color: "#fff8dc" });
    onNoteAdded(); // refresh notes
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <label htmlFor="color" className="mr-2 text-sm text-gray-600">Color:</label>
            <input 
              type="color" 
              id="color"
              name="color" 
              value={note.color} 
              onChange={handleChange}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer" 
            />
          </div>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            Add Note
          </button>
        </div>
      </div>
      <textarea
        name="content"
        placeholder="Write your note..."
        value={note.content}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
};

export default NoteForm;
