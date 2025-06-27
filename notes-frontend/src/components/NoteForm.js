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
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Write your note..."
        value={note.content}
        onChange={handleChange}
      />
      <input type="color" name="color" value={note.color} onChange={handleChange} />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
