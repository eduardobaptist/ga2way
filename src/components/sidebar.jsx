import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";
import { Home, Menu, Users, LogOut, Route, Rocket } from "lucide-react";
import gatewayLogo from "../assets/img/gateway_logo_branco.png";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CollapsibleNavLink from "./collapsibleNavLink";

const Sidebar = () => {
  const { logout } = useAuth();

  const renderNavLinks = (isMobile = false) => (
    <nav
      className={`grid items-start ${
        isMobile
          ? "gap-2 text-lg font-medium mt-6"
          : "px-2 text-sm font-medium lg:px-4"
      }`}
    >
      <CollapsibleNavLink
        label="Rotas"
        to="/rotas"
        childrenRoutes="/rotas/*"
        icon={<Route className="w-4 h-4" />}
        isMobile={isMobile}
      >
        <CollapsibleNavLink
          label="Programas"
          to="/rotas/programas"
          childrenRoutes="/rotas/programas/*"
          icon={<Rocket className="w-4 h-4" />}
          isMobile={isMobile}
        >
          <NavLink
            to="/rotas/programas/projetos"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive ? "bg-muted text-primary" : "text-muted-foreground"
              } ${isMobile ? "mx-[-0.65rem]" : ""}`
            }
          >
            <Home className="h-4 w-4" />
            Projetos
          </NavLink>
        </CollapsibleNavLink>
      </CollapsibleNavLink>
      <NavLink
        to="/usuarios"
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive ? "bg-muted text-primary" : "text-muted-foreground"
          } ${isMobile ? "mx-[-0.65rem]" : ""}`
        }
      >
        <Users className="h-4 w-4" />
        Usuários
      </NavLink>
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
          <div className="flex h-14 items-center border-b lg:h-[60px] bg-[var(--azul-agregar)] justify-center">
            <NavLink to="/" className="flex items-center gap-2 font-semibold">
              <img src={gatewayLogo} alt="Gateway Logo" className="h-10" />
            </NavLink>
          </div>
          <div className="flex-1">{renderNavLinks()}</div>
          <div className="mt-auto p-4">
            <NavLink
              onClick={logout}
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
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] bg-[var(--azul-agregar)] lg:px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              {renderNavLinks(true)}
              <div className="mt-auto">
                <NavLink
                  onClick={logout}
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
            <img src={gatewayLogo} alt="Gateway Logo" className="h-10" />
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
