import { LogOut } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/stores/useAuthStore";

export const SidebarLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="list-none">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <SidebarMenuButton className="w-full d-flex justify-center gap-2 border border-black/20 bg-transparent hover:bg-gray-100 rounded-md transition-colors">
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Encerrar sessão</span>
            </SidebarMenuButton>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
              <AlertDialogDescription>
                Você será redirecionado para a homepage e terá de fazer login
                novamente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
