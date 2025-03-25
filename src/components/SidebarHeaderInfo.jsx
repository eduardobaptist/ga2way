import React from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Building2, GraduationCap, UserCog, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const SidebarHeaderInfo = () => {
  const { authData, getUserTipo } = useAuthStore();

  const userTipo = getUserTipo();
  const email = authData?.email;
  const info =
    userTipo === "admin"
      ? "Administrador"
      : userTipo === "empresa"
        ? "Empresa"
        : "ICT";
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
      <div className="min-w-0 flex-1 text-left">
        <div className="flex items-center justify-between gap-4">
          <div className="truncate font-semibold text-sm">{email}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ChevronDown height={20} width={20} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Perfil</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Atualizar informações</DropdownMenuItem>
                      <DropdownMenuItem>Redefinir senha</DropdownMenuItem>
                      <DropdownMenuItem disabled>Excluir conta</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Configurações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="truncate text-xs text-gray-500">{info}</div>
      </div>
    </div>
  );
};

export default SidebarHeaderInfo;
