import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

// attach bearer token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers!['Authorization'] = `Bearer ${token}`;
  return config;
});
