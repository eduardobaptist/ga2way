import { MainWrapper } from "@/components/MainWrapper";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/Field";
import { toast } from "@/hooks/use-toast";
import { formatDatetime } from "@/lib/utils";
import api from "@/axios.config";

export const ProjetosView = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [projeto, setProjeto] = useState(null);
  const navigate = useNavigate();
  const fetchProjeto = async () => {
    setIsLoading(true);

    try {
      const response = await api.get(`/projetos/${id}`);

      if (response?.data) {
        setProjeto(response?.data);
        console.log(response?.data);
      } else {
        throw new Error("Projeto não encontrado");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
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
      <div className="flex items-center justify-between">
        <Link to="/projetos">
          <Button
            className="bg-[var(--azul-agregar)] text-white hover:text-white hover:bg-[var(--azul-agregar-hover)]"
            variant="outline"
          >
            <ArrowLeftCircle className="mr-2" size="20" />
            Voltar
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <div className="flex mt-5 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Carregando projeto...
        </div>
      ) : (
        <div className="grid grid-cols-1 mt-5 lg:grid-cols-2 gap-6 w-full">
          <Field label="Nome" value={projeto.nome} />
          <Field label="Descrição" value={projeto.descricao} />
          <Field label="Programa do projeto" value={projeto.programa?.nome} />
          <Field
            label="Data de início"
            value={`${formatDatetime(projeto.data_inicio) || ""}`}
          />
          <Field
            label="Data de término"
            value={`${formatDatetime(projeto.data_fim) || ""}`}
          />

          <Field
            label="Nível TRL"
            value={`${formatDatetime(projeto.tlr) || ""}`}
          />

          <Field label="Nível TRL" value={projeto.tlr} />
          <Field label="Nível ACATECH" value={projeto.acatech} />
        </div>
      )}
    </MainWrapper>
  );
};
