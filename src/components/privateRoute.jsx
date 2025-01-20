import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

export const PrivateRoute = () => {
  const token = useAuthStore((state) => state.getToken());

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
