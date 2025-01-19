import { Route, Rocket, Home, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { SidebarLogout } from "./SidebarLogout";
import { SidebarSingleMenuItem } from "./SidebarSingleMenuItem";
import { SidebarCollapsibleMenu } from "./SidebarCollapsibleMenu";

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

export const AppSidebar = () => {
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent className="list-none">
            <SidebarMenu>
              {items.map((item) =>
                item.items ? (
                  <SidebarCollapsibleMenu key={item.title} item={item} />
                ) : (
                  <SidebarSingleMenuItem key={item.title} item={item} />
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarLogout />
      </SidebarFooter>
    </Sidebar>
  );
};
