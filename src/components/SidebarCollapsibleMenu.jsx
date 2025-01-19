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

import { useState } from "react";

const CollapsibleMenuItem = ({ subItem }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <SidebarMenuSubItem key={subItem.title}>
      <SidebarMenuSubButton
        className={isActive ? "bg-gray-100" : "bg-transparent"}
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
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};

export const SidebarCollapsibleMenu = ({ item }) => {
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
            {item.items?.map((subItem) => (
              <CollapsibleMenuItem key={subItem.title} subItem={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
