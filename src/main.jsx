// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { 
  createBrowserRouter, 
  RouterProvider, 
  createRoutesFromElements, 
  Route 
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/components/authContext";
import api, { setAuthContext } from "@/config/axios.config";

import Home from "./pages/home";
import Projetos from "./pages/projetos/projetos";
import ProjetosNew from "./pages/projetos/projetosNew";
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
            <Route path="programas">
              <Route index element={null} />
              <Route path="projetos">
                <Route index element={<Projetos />} />
                <Route path="novo" element={<ProjetosNew />} />
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