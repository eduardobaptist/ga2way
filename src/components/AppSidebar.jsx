import {
  Route,
  Rocket,
  Home,
  Users,
  Building2,
  GraduationCap,
  StickyNote,
  Pointer,
  Handshake,
  Lightbulb,
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
import { useAuthStore } from "@/stores/useAuthStore";

const items = [
  {
    title: "Projetos",
    items: [
      {
        title: "Rotas",
        url: "/rotas",
        icon: Route,
        userRoles: ["admin", "empresa"],
      },
      {
        title: "Programas",
        url: "/programas",
        icon: StickyNote,
        userRoles: ["admin", "empresa"],
      },
      {
        title: "Projetos",
        url: "/projetos",
        icon: Home,
        userRoles: ["admin", "ict", "empresa"],
      },
    ],
  },
  {
    title: "Usuários",
    url: "/usuarios",
    userRoles: ["admin"],
    icon: Users,
  },
  {
    title: "Impulsos acadêmicos",
    url: "/impulsos",
    userRoles: ["admin", "empresa"],
    icon: Rocket,
  },
  {
    title: "Empresas",
    url: "/empresas",
    icon: Building2,
    userRoles: ["admin"],
  },
  {
    title: "Institutos (ICTs)",
    url: "/icts",
    icon: GraduationCap,
    userRoles: ["admin"],
  },
  {
    title: "Parcerias",
    url: "/parcerias",
    icon: Handshake,
    userRoles: ["admin", "empresa", "ict"],
  },
];

export const AppSidebar = () => {
  const userType = useAuthStore((state) => state.getUserTipo());

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
                  item.userRoles.includes(userType) && (
                    <SidebarSingleMenuItem key={item.title} item={item} />
                  )
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
