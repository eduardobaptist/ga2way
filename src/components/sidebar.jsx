import { NavLink, Outlet } from "react-router-dom";
import { Home, Menu, Users, ClipboardList, LogOut } from "lucide-react";
import gatewayLogo from "../assets/img/gateway_logo_branco.png";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
          <div className="flex h-14 items-center border-b lg:h-[60px] bg-[var(--azul-agregar)] justify-center">
            <NavLink to="/" className="flex items-center gap-2 font-semibold">
              <img src={gatewayLogo} alt="" />
            </NavLink>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/private/projetos"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActive ? "bg-muted text-primary" : "text-muted-foreground"
                  }`
                }
              >
                <Home className="h-4 w-4" />
                Projetos
              </NavLink>
              <NavLink
                to="/private/usuarios"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActive ? "bg-muted text-primary" : "text-muted-foreground"
                  }`
                }
              >
                <Users className="h-4 w-4" />
                Usuários
              </NavLink>
              <NavLink
                to="/private/gerenciamento"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActive ? "bg-muted text-primary" : "text-muted-foreground"
                  }`
                }
              >
                <ClipboardList className="h-4 w-4" />
                Gerenciamento
                <Badge className="text-xs" variant="outline">
                  Em breve
                </Badge>
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  isActive ? "bg-muted text-primary" : "text-muted-foreground"
                }`
              }
            >
              <LogOut className="h-4 w-4" />
              Sair
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden">
        <header className="flex h-14 items-center  gap-4 border-b px-4 lg:h-[60px] bg-[var(--azul-agregar)] lg:px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium mt-6">
                <NavLink
                  to="/private/demandas"
                  className={({ isActive }) =>
                    `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                      isActive
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <Home className="h-4 w-4" />
                  Demandas
                </NavLink>
                <NavLink
                  to="/private/usuarios"
                  className={({ isActive }) =>
                    `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                      isActive
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <Users className="h-4 w-4" />
                  Usuários
                </NavLink>
                <NavLink
                  to="/private/gerenciamento"
                  className={({ isActive }) =>
                    `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                      isActive
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <ClipboardList className="h-4 w-4" />
                  Gerenciamento
                </NavLink>
              </nav>
              <div className="mt-auto">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                      isActive
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </NavLink>
              </div>
            </SheetContent>
          </Sheet>
          <NavLink to="/" className="flex items-center gap-2 font-semibold s-a">
            <img src={gatewayLogo} alt="" />
          </NavLink>
        </header>
        <main className="flex flex-1 flex-col overflow-y-auto P-0 lg:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
