import { useState } from "react";
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
import { Menu, Trash2, Edit2, Eye, Handshake, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "@/hooks/use-toast";
import api from "@/axios.config";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const ProjetosActions = ({ projeto, onRefresh }) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInteresseDialogOpen, setIsInteresseDialogOpen] = useState(false);

  const [proposta, setProposta] = useState("");
  const [ofertaId, setOfertaId] = useState(null);

  const { getUserTipo } = useAuthStore();
  const userTipo = getUserTipo();

  const handleView = () => navigate(`/projetos/${projeto.id}`);
  const handleEdit = () => navigate(`/projetos/editar/${projeto.id}`);

  const handleDelete = async () => {
    try {
      await api.delete(`/projetos/${projeto.id}`);
      toast({ title: "Projeto excluído com sucesso", variant: "success" });
      onRefresh?.();
    } catch (error) {
      toast({
        title: error.response?.data?.error || "Erro ao excluir projeto",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setIsDropdownOpen(false);
    }
  };

  const handlePublish = async () => {
    try {
      await api.post("/ofertas", {
        projeto_id: projeto.id,
        data_inicio: projeto.data_inicio,
        data_fim: projeto.data_fim,
      });
      toast({ title: "Projeto ofertado com sucesso", variant: "success" });
      onRefresh?.();
    } catch (error) {
      toast({
        title: error.response?.data?.error || "Erro ao ofertar projeto",
        variant: "destructive",
      });
    } finally {
      setIsDropdownOpen(false);
    }
  };

  const handleInterest = async () => {
    try {
      const response = await api.get("/ofertas");
      const oferta = response?.data?.find(
        (oferta) => oferta.projeto_id === projeto.id
      );
      if (oferta) {
        setOfertaId(oferta.id);
        setIsInteresseDialogOpen(true);
      }
    } catch (error) {
      toast({
        title:
          error.response?.data?.error ||
          "Erro ao carregar oferta do projeto na demonstração de interesse",
        variant: "destructive",
      });
    }
  };

  const handleSubmitInterest = async () => {
    try {
      await api.post("/interesses", {
        proposta,
        oferta_id: ofertaId,
      });
      toast({ title: "Interesse enviado com sucesso", variant: "success" });
      setIsInteresseDialogOpen(false);
      setProposta("");
    } catch (error) {
      toast({
        title: error.response?.data?.error || "Erro ao enviar interesse",
        variant: "destructive",
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger className="focus:outline-none">
              <Menu className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {["admin", "empresa"].includes(userTipo) &&
              projeto.status !== "PUBLICADO" ? (
                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={handlePublish}
                >
                  <Send className="h-4 w-4" />
                  <span>Publicar</span>
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem
                onClick={handleView}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Eye className="h-4 w-4" />
                <span>Ver detalhes</span>
              </DropdownMenuItem>
              {["admin", "empresa"].includes(userTipo) ? (
                <DropdownMenuItem
                  onClick={handleEdit}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Alterar</span>
                </DropdownMenuItem>
              ) : null}
              {userTipo === "ict" ? (
                <DropdownMenuItem
                  onClick={handleInterest}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Handshake className="h-4 w-4" />
                  <span>Demonstrar interesse</span>
                </DropdownMenuItem>
              ) : null}
              {["admin", "empresa"].includes(userTipo) ? (
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
              ) : null}
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
              este projeto serão permanentemente excluídos.
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

      <AlertDialog
        open={isInteresseDialogOpen}
        onOpenChange={setIsInteresseDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader></AlertDialogHeader>
          <div className="space-y-2">
            <Label htmlFor="proposta">
              Escreva sua proposta para este projeto.
            </Label>
            <Input id="proposta" placeholder="Digite sua proposta..." />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleSubmitInterest}
              className="bg-green-600 hover:bg-green-700 focus:ring-green-600"
            >
              Enviar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
};
