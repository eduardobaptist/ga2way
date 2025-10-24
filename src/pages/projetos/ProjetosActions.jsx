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
import {
  Menu,
  Trash2,
  Edit2,
  Eye,
  Handshake,
  Send,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import api from "@/axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ProjetosActions = ({ projeto, onRefresh }) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInteresseDialogOpen, setIsInteresseDialogOpen] = useState(false);
  const [proposta, setProposta] = useState("");
  const [ofertaId, setOfertaId] = useState(null);

  const { user } = useAuth();
  const userTipo = user?.tipo;

  const handleView = (e) => {
    e.stopPropagation();
    navigate(`/projetos/${projeto.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/projetos/editar/${projeto.id}`);
  };

  const handleProposta = (e) => {
    e.stopPropagation();
    navigate(`/projetos/propostas/${projeto.id}`);
  };

  const handlePublish = async (e) => {
    e.stopPropagation();
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
        title: error.response?.data?.message || "Erro ao ofertar projeto",
        variant: "destructive",
      });
    } finally {
      setIsDropdownOpen(false);
    }
  };

  const handleInterest = async (e) => {
    e.stopPropagation();
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
          error.response?.data?.message ||
          "Erro ao carregar oferta do projeto na demonstração de interesse",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await api.delete(`/projetos/${projeto.id}`);
      toast({ title: "Projeto excluído com sucesso", variant: "success" });
      onRefresh?.();
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Erro ao excluir projeto",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setIsDropdownOpen(false);
    }
  };

  const handleSubmitInterest = async (e) => {
    e.stopPropagation();
    try {
      toast({
        title: "Enviando interesse à empresa, aguarde...",
        variant: "warning",
      });
      await api.post("/interesses", {
        proposta,
        oferta_id: ofertaId,
      });
      toast({ title: "Interesse enviado com sucesso", variant: "success" });
      setIsInteresseDialogOpen(false);
      setProposta("");
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Erro ao enviar interesse",
        variant: "destructive",
      });
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-block">
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger
                className="focus:outline-none"
                onClick={(e) => e.stopPropagation()}
              >
                <Menu className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48"
                onClick={(e) => e.stopPropagation()}
              >
                {["admin", "empresa"].includes(userTipo) &&
                projeto.status === "NÃO PÚBLICADO" ? (
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={(e) => handlePublish(e)}
                  >
                    <Send className="h-4 w-4" />
                    <span>Publicar</span>
                  </DropdownMenuItem>
                ) : null}
                {userTipo === "empresa" && projeto.status === "PUBLICADO" ? (
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={(e) => handleProposta(e)}
                  >
                    <Lightbulb className="h-4 w-4" />
                    <span>Propostas</span>
                  </DropdownMenuItem>
                ) : null}
                {userTipo === "ict" ? (
                  <DropdownMenuItem
                    onClick={(e) => handleInterest(e)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Handshake className="h-4 w-4" />
                    <span>Demonstrar interesse</span>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem
                  onClick={(e) => handleView(e)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                  <span>Ver detalhes</span>
                </DropdownMenuItem>
                {projeto.status === "NÃO PÚBLICADO" && ["admin", "empresa"].includes(userTipo) ? (
                  <DropdownMenuItem
                    onClick={handleEdit}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>Alterar</span>
                  </DropdownMenuItem>
                ) : null}
                {["admin", "empresa"].includes(userTipo) ? (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
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
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Opções</p>
        </TooltipContent>
      </Tooltip>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todos os dados relacionados a
              este projeto serão permanentemente excluídos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => handleDelete(e)}
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
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader></AlertDialogHeader>
          <div className="space-y-2">
            <Label htmlFor="proposta">
              Escreva sua proposta para este projeto.
            </Label>
            <Input
              onChange={(e) => setProposta(e.target.value)}
              id="proposta"
              onClick={(e) => e.stopPropagation()}
              placeholder="Digite sua proposta..."
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => handleSubmitInterest(e)}
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
