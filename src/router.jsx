import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Home } from "@/pages/Home";
import { PrivateRoute } from "@/components/PrivateRoute";
import { Layout } from "./components/Layout";

import { RotasList } from "@/pages/rotas/RotasList";
import { RotasCreate } from "@/pages/rotas/RotasCreate";
import { RotasView } from "@/pages/rotas/RotasView";
import { RotasEdit } from "@/pages/rotas/RotasEdit";

import { ProgramasList } from "@/pages/programas/ProgramasList";
import { ProgramasCreate } from "@/pages/programas/ProgramasCreate";
import { ProgramasView } from "@/pages/programas/ProgramasView";
import { ProgramasEdit } from "@/pages/programas/ProgramasEdit";

import { ProjetosList } from "@/pages/projetos/ProjetosList";
import { ProjetosCreate } from "@/pages/projetos/ProjetosCreate";

import { EmpresasList } from "@/pages/empresas/EmpresasList";
import { EmpresasCreate } from "./pages/empresas/EmpresasCreate";
import { EmpresasView } from "./pages/empresas/EmpresasView";
import { EmpresasEdit } from "./pages/empresas/EmpresasEdit";
import { UsuariosList } from "./pages/usuarios/UsuariosList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/rotas",
            children: [
              { index: true, element: <RotasList /> },
              { path: "novo", element: <RotasCreate /> },
              { path: ":id", element: <RotasView /> },
              { path: "editar/:id", element: <RotasEdit /> },
            ],
          },
          {
            path: "/programas",
            children: [
              { index: true, element: <ProgramasList /> },
              { path: "novo", element: <ProgramasCreate /> },
              { path: ":id", element: <ProgramasView /> },
              { path: "editar/:id", element: <ProgramasEdit /> },
            ],
          },
          {
            path: "/projetos",
            children: [
              { index: true, element: <ProjetosList /> },
              { path: "novo", element: <ProjetosCreate /> },
            ],
          },
          {
            path: "/usuarios",
            element: <UsuariosList />,
          },
          {
            path: "/empresas",
            children: [
              { index: true, element: <EmpresasList /> },
              { path: "novo", element: <EmpresasCreate /> },
              { path: ":id", element: <EmpresasView /> },
              { path: "editar/:id", element: <EmpresasEdit /> },
            ],
          },
          {
            path: "/ict",
            element: null,
          },
        ],
      },
    ],
  },
]);
