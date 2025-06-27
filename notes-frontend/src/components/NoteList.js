import React, { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await getNotes();
    setNotes(res.data);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => (
          <div key={note._id} style={{ background: note.color, padding: "1rem", margin: "1rem 0" }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{new Date(note.createdAt).toLocaleString()}</small>
            <br />
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;
