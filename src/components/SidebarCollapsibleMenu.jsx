import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
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
import { cn } from "@/lib/utils";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const CollapsibleMenuItem = ({ subItem }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <SidebarMenuSubItem key={subItem.title}>
      <div
        className={cn(
          "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
          "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "bg-transparent text-sidebar-foreground",
          "group-data-[collapsible=icon]:hidden"
        )}
      >
        <NavLink
          to={subItem.url}
          className={({ isActive: isSubActive }) => {
            setIsActive(isSubActive);
            return "flex items-center gap-2 w-full h-full text-gray-700 hover:bg-gray-100";
          }}
        >
          {subItem.icon && <subItem.icon className="h-4 w-4" />}
          <span>{subItem.title}</span>
        </NavLink>
      </div>
    </SidebarMenuSubItem>
  );
};

export const SidebarCollapsibleMenu = ({ item }) => {
  
  const { user } = useAuth();
  const userType = user?.tipo

  return (
    <Collapsible asChild defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="flex items-center justify-between gap-2 w-full h-full">
            {item.icon && <item.icon className="h-5 w-5" />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map(
              (subItem) =>
                subItem.userRoles.includes(userType) && (
                  <CollapsibleMenuItem key={subItem.title} subItem={subItem} />
                )
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
