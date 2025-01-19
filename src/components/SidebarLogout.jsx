import { LogOut } from "lucide-react";
import {
  SidebarFooter,
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
import { useAuth } from "@/components/AuthContext";
import { useNavigate } from "react-router-dom";

export const SidebarLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <SidebarFooter className="p-4">
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
                <AlertDialogTitle>
                  Tem certeza que deseja sair?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Você será redirecionado para a tela inicial.
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
    </SidebarFooter>
  );
};
