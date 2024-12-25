import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // Backend URL
});

// Attach token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log("Token attached to request:", token); // Debug log
  } else {
    console.warn("No token found in localStorage."); // Debug log
  }
  return req;
});

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);

export const addBook = (book) => API.post("/books", book);
export const fetchBooks = () => API.get("/books");
export const fetchBookById = (id) => API.get(`/books/${id}`);
export const updateBook = (id, book) => API.put(`/books/${id}`, book);
export const deleteBook = (id) => API.delete(`/books/${id}`);
