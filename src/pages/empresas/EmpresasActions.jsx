import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { Menu, Trash2, Edit2, Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import api from "@/axios.config";

export const EmpresasActions = ({ empresa, onRefresh }) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleView = () => {
    navigate(`/empresas/${empresa.id}`);
  };

  const handleEdit = () => {
    navigate(`/empresas/editar/${empresa.id}`);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/empresas/${empresa.id}`);
      toast({
        title: "Empresa excluída com sucesso",
        variant: "success",
      });
      onRefresh?.();
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Erro ao excluir empresa";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setIsDropdownOpen(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu
            open={isDropdownOpen}
            onOpenChange={(open) => {
              setIsDropdownOpen(open);
            }}
          >
            <DropdownMenuTrigger className="focus:outline-none">
              <Menu className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={handleView}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Eye className="h-4 w-4" />
                <span>Ver detalhes</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleEdit}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Edit2 className="h-4 w-4" />
                <span>Alterar</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setIsDeleteDialogOpen(true);
                  setIsDropdownOpen(false);
                }}
                className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                <span>Deletar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>Opções</p>
        </TooltipContent>
      </Tooltip>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todos os dados relacionados a
              esta empresa serão permanentemente excluídos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
};
