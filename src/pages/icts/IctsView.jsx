import { MainWrapper } from "@/components/mainWrapper";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/Field";
import { formatDatetime } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import api from "@/axios.config";

export const IctsView = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [icts, setict] = useState(null);
  const navigate = useNavigate();
  const fetchIcts = async () => {
    setIsLoading(true);

    try {
      const response = await api.get(`/icts/${id}`);

      if (response?.data) {
        setict(response?.data);
      } else {
        throw new Error("ICT não encontrada");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Erro ao carregar ICT.";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
      navigate("/icts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIcts();
  }, []);

  return (
    <MainWrapper title={icts?.nome}>
      <div className="flex items-center justify-between">
        <Link to="/icts">
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
          Carregando ICT...
        </div>
      ) : (
        <div className="grid grid-cols-1 mt-5 lg:grid-cols-2 gap-6 w-full">
          <Field label="Nome" value={`${icts.nome}`} />
          <Field label="Razão social" value={icts.razao_social} />
          <Field label="Email" value={`${icts.email}`} />
          <Field label="Endereço" value={`${icts.endereco}`} />
          <Field
            label="CNPJ"
            value={`${icts.cnpj.replace(
              /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
              "$1.$2.$3/$4-$5"
            )}`}
          />
          <Field
            label="Telefone"
            value={`${icts.telefone.replace(
              /(\d{2})(\d{2})(\d{4})(\d{4})/,
              "+$1 ($2) $3-$4"
            )}`}
          />
          <Field label="Site" value={`${icts.site}`} />
          <Field
            label="Data de criação"
            value={`${formatDatetime(icts.createdAt) || ""}`}
          />
          <Field
            label="Data de alteração"
            value={`${formatDatetime(icts.updatedAt) || ""}`}
          />
        </div>
      )}
    </MainWrapper>
  );
};
