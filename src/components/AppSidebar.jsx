import { Route, Rocket, Home, Users, LogOut, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useAuth } from "./AuthContext";

const items = [
  {
    title: "Projetos",
    url: "/rotas",
    items: [
      { title: "Rotas", url: "/rotas", icon: Route },
      { title: "Programas", url: "/programas", icon: Rocket },
      { title: "Projetos", url: "/projetos", icon: Home },
    ],
  },
  {
    title: "Usuários",
    url: "/projetos",
    icon: Users,
  },
];

const SingleMenuItem = ({ item }) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <NavLink
        to={item.url}
        className={({ isActive }) =>
          `flex items-center gap-2 ${
            isActive ? "bg-gray-200" : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        {item.icon && <item.icon className="h-5 w-5" />}
        <span>{item.title}</span>
      </NavLink>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

const CollapsibleMenuItem = ({ item }) => (
  <Collapsible asChild defaultOpen className="group/collapsible">
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton className="flex items-center justify-between gap-2">
          {item.icon && <item.icon className="h-5 w-5" />}
          <span>{item.title}</span>
          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton asChild>
                <NavLink
                  to={subItem.url}
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive
                        ? "bg-gray-200"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {subItem.icon && <subItem.icon className="h-5 w-5" />}
                  <span>{subItem.title}</span>
                </NavLink>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
);

export const AppSidebar = () => {
  const { logout } = useAuth();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gateway</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) =>
                item.items ? (
                  <CollapsibleMenuItem key={item.title} item={item} />
                ) : (
                  <SingleMenuItem key={item.title} item={item} />
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <NavLink
              onClick={logout}
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive ? "bg-gray-200" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
};
