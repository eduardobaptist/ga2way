import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

import { Card, CardContent } from "./ui/card";
import { Loader2 } from "lucide-react";

export const PrivateRoute = () => {
  const { token, fetchUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      const valid = await fetchUser();
      setIsAuthenticated(valid);
      setLoading(false);
    };

    verifyAuth();
  }, [token]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="shadow-lg rounded-lg p-6">
          <CardContent className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-gray-600 text-lg">Verificando sessão...</p>
          </CardContent>
        </Card>
      </div>
    );

  if (!isAuthenticated) {
    toast({
      variant: "destructive",
      title: "Sessão expirada. Faça login novamente",
    });
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
