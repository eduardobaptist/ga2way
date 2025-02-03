import React from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Building2, GraduationCap, UserCog } from "lucide-react";

export const SidebarHeaderInfo = () => {
  const { authData, getUserTipo, getUserEmpresa, getUserIct } = useAuthStore();

  const userTipo = getUserTipo();
  const email = authData?.email;
  const info =
    userTipo === "admin"
      ? "Administrador"
      : userTipo === "empresa"
      ? getUserEmpresa()
      : getUserIct();
  const logo =
    userTipo === "admin"
      ? UserCog
      : userTipo === "empresa"
      ? Building2
      : GraduationCap;

  return (
    <div className="flex w-full items-center gap-2 p-2">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--azul-agregar)] text-white">
        {React.createElement(logo, { className: "h-5 w-5 font-semibold" })}
      </div>
      <div className="min-w-0 flex-1 text-left text-sm">
        <div className="truncate font-semibold">{email}</div>
        <div className="truncate text-xs text-gray-500">{info}</div>
      </div>
    </div>
  );
};

export default SidebarHeaderInfo;
