import { MainWrapper } from "@/components/MainWrapper";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/Field";
import { toast } from "@/hooks/use-toast";
import api from "@/axios";

export const ProgramasView = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [programa, setPrograma] = useState(null);
  const navigate = useNavigate();
  const fetchPrograma = async () => {
    setIsLoading(true);

    try {
      const response = await api.get(`/programas/${id}`);

      if (response?.data) {
        setPrograma(response?.data);
      } else {
        throw new Error("Programa não encontrado");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao carregar programa.";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
      navigate("/programas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograma();
  }, []);

  return (
    <MainWrapper title={programa?.nome}>
      <div className="flex items-center justify-between">
        <Link to="/programas">
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
          Carregando programa...
        </div>
      ) : (
        <div className="grid grid-cols-1 mt-5 lg:grid-cols-2 gap-6 w-full">
          <Field label="Nome" value={`${programa.nome}`} />
          <Field label="Descrição" value={programa.descricao} />
          <Field label="Rota" value={`${programa.Rota.nome}`} />
        </div>
      )}
    </MainWrapper>
  );
};
