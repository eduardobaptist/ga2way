// Updated AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    try {
      const response = await api.post("/login", data);
      setUser(response.data.usuario);
      return { success: true, user: response.data.usuario};
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{user, setUser, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
