import {
  Route,
  Rocket,
  Home,
  Users,
  Building2,
  GraduationCap,
  StickyNote
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
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
import { SidebarHeaderInfo } from "./SidebarHeaderInfo";

const items = [
  {
    title: "Projetos",
    items: [
      { title: "Rotas", url: "/rotas", icon: Route },
      { title: "Programas", url: "/programas", icon: StickyNote },
      { title: "Projetos", url: "/projetos", icon: Home },
    ],
  },
  {
    title: "Usuários",
    url: "/usuarios",
    icon: Users,
  },
  {
    title: "Impulsos acadêmicos",
    url: "/impulsos",
    icon: Rocket,
  },
  {
    title: "Empresas",
    url: "/empresas",
    icon: Building2,
  },
  {
    title: "Institutos (ICTs)",
    url: "/icts",
    icon: GraduationCap,
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarHeaderInfo />
      </SidebarHeader>

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

      <SidebarFooter className="p-4">
        <SidebarLogout />
      </SidebarFooter>
    </Sidebar>
  );
};
