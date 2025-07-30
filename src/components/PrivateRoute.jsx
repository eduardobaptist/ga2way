import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import api from "@/axios";

export const PrivateRoute = () => {
  const { user, setUser } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(!user);

  useEffect(() => {
    if (!user) {
      api
        .get("/me")
        .then((res) => {
          setUser(res.data.usuario);
        })
        .catch(() => setUser(null))
        .finally(() => setIsCheckingAuth(false));
    }
  }, []);

  if (isCheckingAuth)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-gray-600 text-lg">Carregando...</p>
      </div>
    );
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};
