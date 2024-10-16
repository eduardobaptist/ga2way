import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const CollapsibleNavLink = ({ label, to, icon, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div>
      <div
        className={`flex items-center justify-between rounded-lg transition-all ${
          isActive ? "bg-muted text-primary" : "text-muted-foreground"
        }`}
      >
        <NavLink
          className="flex items-center gap-3 px-3 py-2 flex-grow hover:text-primary"
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
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      </div>
      {isExpanded && <div className="pl-4">{children}</div>}
    </div>
  );
};

export default CollapsibleNavLink;
