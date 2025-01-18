import React from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/components/AuthContext";
import { setAuthContext } from "@/axios.config";
import { router } from "@/router";

export const App = () => {
  const authContext = useAuth();

  React.useEffect(() => {
    setAuthContext(authContext);
  }, [authContext]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};