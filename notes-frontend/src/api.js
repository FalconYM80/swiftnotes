import axios from "axios";

// Hardcoded API URL for Railway
const API_URL = "https://swiftnotes-production.up.railway.app/api";
console.log("Using hardcoded API URL:", API_URL);

const API = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response || error.message || error);
    return Promise.reject(error);
  }
);

// Note operations
export const getNotes = () => API.get("/notes");
export const createNote = (note) => API.post("/notes", note);
export const updateNote = (id, note) => API.put(`/notes/${id}`, note);
export const deleteNote = (id) => API.delete(`/notes/${id}`);

// Auth operations
export const login = (formData) => API.post("/auth/login", formData);
export const register = (formData) => {
  console.log("Register API call with data:", formData);
  return API.post("/auth/register", formData);
};
