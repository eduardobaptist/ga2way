import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";
import { Home, PanelLeft, Users, LogOut, Route, Rocket } from "lucide-react";
import gatewayLogo from "../assets/img/gateway_logo_branco.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CollapsibleNavLink from "./collapsibleNavLink";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const renderNavLinks = (isMobile = false) => (
    <nav
      className={`grid items-start ${
        isMobile
          ? "gap-2 text-lg font-medium mt-6"
          : "px-2 text-sm font-medium lg:px-4"
      }`}
    >
      {!collapsed ? (
        <CollapsibleNavLink
          label={collapsed ? "" : "Rotas"}
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
      ) : (
        <NavLink
          to="/rotas"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
              isActive ? "bg-muted text-primary" : "text-muted-foreground"
            } ${isMobile ? "mx-[-0.65rem]" : ""}`
          }
        >
          <Route className="h-4 w-4" />
        </NavLink>
      )}
      <NavLink
        to="/usuarios"
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive ? "bg-muted text-primary" : "text-muted-foreground"
          } ${isMobile ? "mx-[-0.65rem]" : ""}`
        }
      >
        <Users className="h-4 w-4" />
        {!collapsed ? "Usuários" : ""}
      </NavLink>
    </nav>
  );

  return (
    <div
      className={cn(
        "grid min-h-screen w-full",
        collapsed
          ? "md:grid-cols-[60px_1fr] lg:grid-cols-[80px_1fr] transition-all duration-300"
          : "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] transition-all duration-300"
      )}
    >
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
          <div
            className={cn(
              "flex px-2 lg:px-4 h-14 items-center border-b lg:h-[60px] bg-[var(--azul-agregar)]",
              collapsed ? "justify-center" : "justify-between"
            )}
          >
            {!collapsed ? (
              <NavLink to="/" className="flex items-center gap-2 font-semibold">
                <img src={gatewayLogo} className="h-8" />
              </NavLink>
            ) : (
              ""
            )}
            <PanelLeft
              className="h-7 w-7 text-white shrink-0 cursor-pointer"
              onClick={() => setCollapsed(!collapsed)}
            />
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
              {!collapsed ? "Sair" : ""}
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] bg-[var(--azul-agregar)] lg:px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <PanelLeft className="h-7 w-7 text-white shrink-0 cursor-pointer" />
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
                  {!collapsed ? "Sair" : ""}
                </NavLink>
              </div>
            </SheetContent>
          </Sheet>
          <NavLink to="/" className="flex items-center gap-2 font-semibold s-a">
            <img src={gatewayLogo} alt="Gate2Way" className="h-8" />
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
