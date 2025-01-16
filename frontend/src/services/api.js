import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Changez l'URL si nécessaire
});

// Ajouter le token JWT à chaque requête
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Récupère le token stocké
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Ajoute "Bearer <token>" dans l'en-tête
  }
  return req;
});

// Auth API
export const register = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Transaction API
export const getTransactions = () => API.get("/transactions/all");
export const addTransaction = (data) => API.post("/transactions/add", data);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
export const updateTransaction = (id, data) =>
  API.put(`/transactions/${id}`, data);
