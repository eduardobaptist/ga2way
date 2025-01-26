import { NavLink } from "react-router-dom";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { useState } from "react";

export const SidebarSingleMenuItem = ({ item }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <SidebarMenuItem className={isActive ? "bg-gray-100 rounded-md" : "bg-transparent"}>
      <SidebarMenuButton>
        <NavLink
          to={item.url}
          className={({ isActive }) => {
            setIsActive(isActive);
            return "flex items-center gap-2 w-full h-full text-gray-700 hover:bg-gray-100";
          }}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          <span>{item.title}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
