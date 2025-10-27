import { MainWrapper } from "@/components/MainWrapper";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import api from "@/axios";
import { useAuth } from "@/contexts/AuthContext";

import { TabGeral } from "@/pages/projetos/view/TabGeral";
import { TabPropostas } from "@/pages/projetos/view/TabPropostas";
import { TabHistorico } from "@/pages/projetos/view/TabHistorico";
import { TabCanvas } from "@/pages/projetos/view/TabCanvas";

export const ProjetosView = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [projeto, setProjeto] = useState(null);
  const [tab, setTab] = useState("geral");
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const tabOptions = [
    { value: "geral", label: "Geral" },
    ...(["admin", "empresa"].includes(user?.tipo)
      ? [
          { value: "propostas", label: "Propostas" },
          { value: "historico", label: "Histórico" },
        ]
      : []),
    { value: "canvas", label: "Project canvas" },
  ];

  const fetchProjeto = async () => {
    setIsLoading(true);

    try {
      const response = await api.get(`/projetos/${id}`);

      if (response?.data) {
        setProjeto(response?.data);
      } else {
        throw new Error("Projeto não encontrado");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao carregar projeto.";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
      navigate("/projetos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjeto();
  }, []);

  return (
    <MainWrapper title={projeto?.nome}>
      <Tabs defaultValue="geral" value={tab} onValueChange={setTab}>
        <div className="flex flex-col mb-5 sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
          <Link to="/projetos">
            <Button
              className="bg-[var(--azul-agregar)] text-white hover:text-white hover:bg-[var(--azul-agregar-hover)]"
              variant="outline"
            >
              <ArrowLeftCircle className="mr-2" size="20" />
              Voltar
            </Button>
          </Link>

          {isMobile ? (
            <div className="w-full sm:w-auto min-w-[250px]">
              <Select value={tab} onValueChange={setTab}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma seção" />
                </SelectTrigger>
                <SelectContent>
                  {tabOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <TabsList>
              {tabOptions.map((option) => (
                <TabsTrigger key={option.value} value={option.value}>
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          )}
        </div>

        {isLoading ? (
          <div className="flex mt-5 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Carregando projeto...
          </div>
        ) : (
          <>
            <TabsContent value="geral">
              <TabGeral projeto={projeto} />
            </TabsContent>

            <TabsContent value="propostas">
              <TabPropostas projeto={projeto} onRefresh={fetchProjeto} />
            </TabsContent>

            <TabsContent value="historico">
              <TabHistorico projeto={projeto} />
            </TabsContent>

            <TabsContent value="canvas">
              <TabCanvas projeto={projeto} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </MainWrapper>
  );
};
