import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  Building2,
  GraduationCap,
  UserCog,
  EllipsisVertical,
} from "lucide-react";
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
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const SidebarHeaderInfo = () => {
  const { authData, getUserTipo, getUserEmpresaNome, getUserIctNome, logout } =
    useAuthStore();

  const [userInfo, setUserInfo] = useState({
    empresa_nome: '',
    ict_nome: '',
    userTipo: '',
    email: ''
  });

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (authData) {
      setUserInfo({
        empresa_nome: getUserEmpresaNome() || '',
        ict_nome: getUserIctNome() || '',
        userTipo: getUserTipo() || '',
        email: authData.email || ''
      });
    }
  }, [authData, getUserEmpresaNome, getUserIctNome, getUserTipo]);

  const handleLogout = () => {
    logout();
    setIsLogoutDialogOpen(false);
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setIsLogoutDialogOpen(true);
  };

  const info =
    userInfo.userTipo === "admin"
      ? "Administrador"
      : userInfo.userTipo === "empresa"
        ? userInfo.empresa_nome
        : userInfo.ict_nome;

  const LogoIcon =
    userInfo.userTipo === "admin"
      ? UserCog
      : userInfo.userTipo === "empresa"
        ? Building2
        : GraduationCap;

  return (
    <div className="flex w-full items-center gap-2 p-2">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--azul-agregar)] text-white">
        <LogoIcon className="h-5 w-5 font-semibold" />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <div className="flex items-center justify-between gap-4">
          <div className="truncate font-semibold text-sm">{userInfo.email}</div>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical
                height={20}
                width={20}
                className="cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56" 
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Perfil</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem className="cursor-pointer">Atualizar informações</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Redefinir senha</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">Configurações</DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-500 cursor-pointer"
                onClick={handleLogoutClick}
              >
                Encerrar sessão
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="truncate text-xs text-gray-500">{info}</div>
      </div>

      <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
            <AlertDialogDescription>
              Você será levado para a página principal e terá de fazer login
              novamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsLogoutDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SidebarHeaderInfo;