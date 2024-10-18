import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink, useLocation, useMatch } from "react-router-dom";

const CollapsibleNavLink = ({ label, to, icon, children, childrenRoutes }) => {
  const location = useLocation();
  const match = useMatch(childrenRoutes);
  const [isExpanded, setIsExpanded] = useState(match);
  const isActive = location.pathname === to;

  return (
    <div>
      <div
        className={`flex items-center justify-between rounded-lg transition-all ${
          isActive ? "bg-muted text-primary" : "text-muted-foreground"
        }`}
      >
        <NavLink
          className="flex items-center gap-3 py-2 flex-grow hover:text-primary"
          to={to}
        >
          {icon} {label}
        </NavLink>
        <span
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}
          className="px-3 py-2 cursor-pointer hover:text-primary"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-4 py-2">{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleNavLink;