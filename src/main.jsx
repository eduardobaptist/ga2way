import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home";

import "./index.css";
import PrivateRoute from "./components/privateRoute";
import Sidebar from "./components/sidebar";
import Projetos from "./pages/demandas/projetos";
import { AuthProvider } from "./contexts/authContext";
import ProjetosNew from "./pages/demandas/projetosNew";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/private",
    element: <Sidebar />,
    children: [
      {
        path: "projetos",
        element: <Projetos />,
      },
      {
        path: "projetos/novo",
        element: <ProjetosNew />,
      },
      // {
      //   path: "usuarios",
      //   element: <Usuarios />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
