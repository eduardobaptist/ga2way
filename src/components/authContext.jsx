import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(
    JSON.parse(localStorage.getItem("authData")) || null
  );

  const login = (data) => {
    setAuthData(data);
    localStorage.setItem("authData", JSON.stringify(data));
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem("authData");
    console.log("executando o logout");
    window.location.href = "/";
  };

  // Ensure authData syncs with localStorage when it changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedData = JSON.parse(localStorage.getItem("authData"));
      if (storedData?.token !== authData?.token) {
        setAuthData(storedData);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
