import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/components/authContext";
import api, { setAuthContext } from "@/config/axios.config";

import Home from "./pages/home";

import Rotas from "./pages/rotas/rotas";
import RotasCreate from "./pages/rotas/rotasCreate";
import RotasView from "./pages/rotas/rotasView";
import RotasEdit from "./pages/rotas/rotasEdit";

import Programas from "./pages/programas/programas";
import ProgramasCreate from "./pages/programas/programasCreate";
import ProgramasView from "./pages/programas/programasView";
import ProgramasEdit from "./pages/programas/programasEdit";

import Projetos from "./pages/projetos/projetos";
import ProjetosCreate from "./pages/projetos/projetosCreate";

import PrivateRoute from "./components/privateRoute";
import Sidebar from "./components/sidebar";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />

      <Route element={<PrivateRoute />}>
        <Route element={<Sidebar />}>
          <Route path="rotas">
            <Route index element={<Rotas />} />
            <Route path="novo" element={<RotasCreate />} />
            <Route path=":id" element={<RotasView />} />
            <Route path="editar/:id" element={<RotasEdit />} />
            <Route path="programas">
              <Route index element={<Programas />} />
              <Route path="novo" element={<ProgramasCreate />} />
              <Route path=":id" element={<ProgramasView />} />
              <Route path="editar/:id" element={<ProgramasEdit />} />
              <Route path="projetos">
                <Route index element={<Projetos />} />
                <Route path="novo" element={<ProjetosCreate />} />
              </Route>
            </Route>
          </Route>
          <Route path="usuarios" element={<Projetos />} />
        </Route>
      </Route>
    </Route>
  )
);

const App = () => {
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
