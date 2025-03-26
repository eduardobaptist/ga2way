import React from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { router } from "@/Router";

export const App = () => {

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};