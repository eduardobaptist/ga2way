import { create } from "zustand";
import api from "@/axios.config";

export const useAuthStore = create((set, get) => ({
  token: localStorage.getItem("token") || null,
  authData: null,

  login: (data) => {
    localStorage.setItem("token", data.token);
    set({ token: data.token, authData: data.usuario });
  },

  fetchUser: async () => {
    const token = get().token;
    if (!token) return false;

    try {
      const response = await api.post("/auth");
      set({ authData: response.data.usuario });
      return true;
    } catch (error) {
      set({ authData: null, token: null });
      localStorage.removeItem("token");
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, authData: null });
    window.location.href = "/";
  },

  getUser: () => get().authData,
  getUserEmpresaId: () => get().authData?.empresa_id,
  getUserIctId: () => get().authData?.ict_id,
  getUserEmpresaNome: () => get().authData?.empresa?.nome,
  getUserIctNome: () => get().authData?.ict?.nome,
  getUserTipo: () => get().authData?.tipo,
  getToken: () => get().token,
}));
