import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userFound =
      storedUsers.find(
        (user) => user.username === username && user.password === password
      ) ||
      (user.username === "patricia@gateway.com" &&
        user.password === "admin123");

    if (userFound) {
      setUser(userFound);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userFound));
    } else {
      alert("Usuário ou senha incorretos");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
