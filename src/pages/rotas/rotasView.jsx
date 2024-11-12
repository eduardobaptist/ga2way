import MainWrapper from "@/components/mainWrapper";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Field from "@/components/field";
import { toast } from "@/hooks/use-toast";
import api from "@/config/axios.config";

const RotasView = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [rota, setRota] = useState(null);
  const navigate = useNavigate();
  const fetchRota = async () => {
    setIsLoading(true);

    try {
      const response = await api.get("/rotas");
      const rotaEncontrada = response.data.find(
        (rota) => rota.id === Number(id)
      );

      if (rotaEncontrada) {
        setRota(rotaEncontrada);
      } else {
        throw new Error("Rota não encontrada");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Erro ao carregar rota.";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
      navigate("/rotas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRota();
  }, []);

  return (
    <MainWrapper title={rota?.nome}>
      <div className="flex items-center justify-between">
        <Link to="/rotas">
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
          Carregando rota...
        </div>
      ) : (
        <div className="grid grid-cols-1 mt-5 lg:grid-cols-2 gap-6 w-full">
            <Field label="Nome" value={`${rota.nome}`} />
            <Field label="Descrição" value={rota.descricao} />
        </div>
      )}
    </MainWrapper>
  );
};

export default RotasView;
