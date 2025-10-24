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
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const SidebarLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(({ success, error }) => {
      if (success) {
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao fazer logout",
          description: error.response?.data?.message || "",
        });
      }
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="list-none">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <SidebarMenuButton className="w-full d-flex justify-center gap-2 border border-black/20 bg-transparent hover:bg-gray-100 rounded-md transition-colors text-red-500 hover:text-red-600 focus:text-red-600">
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Encerrar sessão</span>
            </SidebarMenuButton>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
              <AlertDialogDescription>
                Você será levado para a página principal e terá de fazer login
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
