const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} = require("../controllers/notesController");

// Protected routes - require authentication
router.get("/", auth, getNotes);
router.get("/:id", auth, getNote);
router.post("/", auth, createNote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

module.exports = router;
