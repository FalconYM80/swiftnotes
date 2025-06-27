const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  color: { type: String, default: "#ffffff" }
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
