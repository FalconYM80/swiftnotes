import React, { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const res = await getNotes();
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <p className="text-gray-500">Loading notes...</p>
      </div>
    );
  }

  return (
    <div>
      {notes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No notes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div 
              key={note._id} 
              className="rounded-lg shadow-md overflow-hidden"
              style={{ backgroundColor: note.color || '#fff8dc' }}
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                  <button 
                    onClick={() => handleDelete(note._id)}
                    className="ml-2 p-1 text-red-500 hover:text-red-700 focus:outline-none"
                    title="Delete note"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="whitespace-pre-wrap mb-3">{note.content}</div>
                <div className="text-xs text-gray-600 mt-2">
                  {new Date(note.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
