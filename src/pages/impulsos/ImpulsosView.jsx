import { MainWrapper } from "@/components/MainWrapper";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/Field";
import { formatDatetime } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import api from "@/axios";

export const ImpulsosView = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [impulso, setimpulso] = useState(null);
  const navigate = useNavigate();
  const fetchImpulso = async () => {
    setIsLoading(true);

    try {
      const response = await api.get(`/impulsos/${id}`);

      if (response?.data) {
        setimpulso(response?.data);
      } else {
        throw new Error("Impulso não encontrado");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Erro ao carregar impulso.";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
      navigate("/impoulsos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImpulso();
  }, []);

  return (
    <MainWrapper title={impulso?.descricao}>
      <div className="flex items-center justify-between">
        <Link to="/impulsos">
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
          Carregando impulso...
        </div>
      ) : (
        <div className="grid grid-cols-1 mt-5 lg:grid-cols-2 gap-6 w-full">
          <Field label="Descrição" value={`${impulso.descricao}`} />
          <Field label="Valor" value={`R$ ${impulso.valor}`} />
          <Field
            label="Data de início"
            value={`${formatDatetime(impulso.data_inicio)}`}
          />
          <Field
            label="Data de término"
            value={`${formatDatetime(impulso.data_fim)}`}
          />
          <Field
            label="Data de criação"
            value={`${formatDatetime(impulso.createdAt) || ""}`}
          />
          <Field
            label="Data de alteração"
            value={`${formatDatetime(impulso.updatedAt) || ""}`}
          />
        </div>
      )}
    </MainWrapper>
  );
};
