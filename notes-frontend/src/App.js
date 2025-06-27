import React, { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const reloadNotes = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Notes App 📝
        </h1>
        <NoteForm onNoteAdded={reloadNotes} />
        <NoteList key={refresh} />
      </div>
    </div>
  );
}

export default App;
