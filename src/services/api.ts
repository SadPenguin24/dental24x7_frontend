import axios from "axios";

//only for demonstration purposes
//otherwise prod won't read the :8080 on live
const API_URL = `${import.meta.env.VITE_API_URL}:8080/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
