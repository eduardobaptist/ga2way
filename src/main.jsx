import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Home from "./pages/home";
import "./index.css";
import PrivateRoute from "./components/privateRoute";
import Sidebar from "./components/sidebar";
import Projetos from "./pages/projetos/projetos";
import ProjetosNew from "./pages/projetos/projetosNew";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <Sidebar />,
    children: [
      {
        path: "rotas",
        element: <></>,
      },
      {
        path: "rotas/programas",
        element: <></>,
      },
      {
        path: "rotas/programas/projetos",
        element: <Projetos />,
      },
      {
        path: "rotas/programas/projetos/novo",
        element: <ProjetosNew />,
      },
      {
        path: "usuarios",
        element: <Projetos />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
