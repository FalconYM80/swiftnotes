import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Add token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

// Note operations
export const getNotes = () => API.get("/notes");
export const createNote = (note) => API.post("/notes", note);
export const updateNote = (id, note) => API.put(`/notes/${id}`, note);
export const deleteNote = (id) => API.delete(`/notes/${id}`);

// Auth operations
export const login = (formData) => API.post("/auth/login", formData);
export const register = (formData) => API.post("/auth/register", formData);
