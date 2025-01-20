import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authData: null,

      login: (data) => set({ authData: data }),

      logout: () => {
        set({ authData: null });
        window.location.href = "/";
      },

      getUser: () => get().authData?.usuario,
      getToken: () => get().authData?.token,
      getUserTipo: () => get().authData?.usuario?.tipo,
      getUserEmpresa: () => get().authData?.usuario?.empresa_id,
      getUserIct: () => get().authData?.usuario?.ict_id,
    }),
    {
      name: "auth-storage",
    }
  )
);
