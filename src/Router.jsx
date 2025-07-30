import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home/Home";
import { Login } from "./pages/home/Login";
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
import { ProjetosView } from "./pages/projetos/ProjetosView";

import { UsuariosList } from "./pages/usuarios/UsuariosList";

import { EmpresasList } from "@/pages/empresas/EmpresasList";
import { EmpresasCreate } from "./pages/empresas/EmpresasCreate";
import { EmpresasView } from "./pages/empresas/EmpresasView";
import { EmpresasEdit } from "./pages/empresas/EmpresasEdit";

import { IctsList } from "./pages/icts/IctsList";
import { IctsCreate } from "./pages/icts/IctsCreate";
import { IctsView } from "./pages/icts/IctsView";
import { IctsEdit } from "./pages/icts/IctsEdit";

import { UsuariosCreate } from "./pages/usuarios/UsuariosCreate";
import { UsuariosEdit } from "./pages/usuarios/UsuariosEdit";
import { UsuariosView } from "./pages/usuarios/UsuariosView";

import { ImpulsosList } from "./pages/impulsos/ImpulsosList";
import { ImpulsosCreate } from "./pages/impulsos/ImpulsosCreate";
import { ImpulsosEdit } from "./pages/impulsos/ImpulsosEdit";
import { ImpulsosView } from "./pages/impulsos/ImpulsosView";

import { PropostasList } from "./pages/propostas/PropostasList";
import { ParceriasList } from "./pages/parcerias/ParceriasList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
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
              { path: ":id", element: <ProjetosView /> },
            ],
          },
          {
            path: "/usuarios",
            children: [
              { index: true, element: <UsuariosList /> },
              { path: "novo", element: <UsuariosCreate /> },
              { path: ":id", element: <UsuariosView /> },
              { path: "editar/:id", element: <UsuariosEdit /> },
            ],
          },
          {
            path: "/impulsos",
            children: [
              { index: true, element: <ImpulsosList /> },
              { path: "novo", element: <ImpulsosCreate /> },
              { path: ":id", element: <ImpulsosView /> },
              { path: "editar/:id", element: <ImpulsosEdit /> },
            ],
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
            path: "/icts",
            children: [
              { index: true, element: <IctsList /> },
              { path: "novo", element: <IctsCreate /> },
              { path: ":id", element: <IctsView /> },
              { path: "editar/:id", element: <IctsEdit /> },
            ],
          },
          {
            path: "/projetos/propostas",
            children: [{ path: ":id", element: <PropostasList /> }],
          },
          {
            path: "/parcerias",
            children: [{ index: true, element: <ParceriasList /> }],
          },
        ],
      },
    ],
  },
]);
