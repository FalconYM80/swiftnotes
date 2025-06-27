const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
};

exports.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
};

exports.createNote = async (req, res) => {
  const { title, content, color } = req.body;
  const newNote = new Note({ title, content, color });
  const savedNote = await newNote.save();
  res.status(201).json(savedNote);
};

exports.updateNote = async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedNote) return res.status(404).json({ message: "Note not found" });
  res.json(updatedNote);
};

exports.deleteNote = async (req, res) => {
  const deletedNote = await Note.findByIdAndDelete(req.params.id);
  if (!deletedNote) return res.status(404).json({ message: "Note not found" });
  res.json({ message: "Note deleted" });
};
