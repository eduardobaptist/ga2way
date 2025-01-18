import axios from "axios";
import { toast } from "@/hooks/use-toast";

let logout = null;

export const setAuthContext = (authContext) => {
  logout = authContext.logout;
};

const api = axios.create({
  baseURL: "/api",
});

/* manda o JWT em todas as requests */
api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("authData"))?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authData");

      if (window.location.pathname !== "/") {
        toast({
          variant: "destructive",
          title: "Sessão expirada",
          description: "Por favor, faça login novamente.",
        });

        if (logout) logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
