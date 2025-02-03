import axios from "axios";
import { useAuthStore } from "./stores/useAuthStore";

const api = axios.create({
  baseURL: "/api",
});

/* add o JWT em todas as requests */
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
