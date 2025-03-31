import { MainWrapper } from "@/components/MainWrapper";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Loader2, CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { formatDatetime } from "@/lib/utils";
import api from "@/axios.config";

export const PropostasList = () => {
  const [filterType, setFilterType] = useState("proposta");
  const [searchTerm, setSearchTerm] = useState("");
  const [propostas, setPropostas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const filters = [
    { value: "proposta", label: "Proposta" },
    { value: "ict", label: "ICT" },
    { value: "dataCricao", label: "Data de Criação" },
  ];

  const fetchPropostas = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const oferta_id = await getOferta();
      if (oferta_id) {
        const response = await api.get(`/interesses/oferta/${oferta_id}`);
        setPropostas(response.data.interesses);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Erro ao carregar propostas.";
      setError(errorMessage);
      toast({
        title: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getOferta = async () => {
    try {
      const response = await api.get("/ofertas");
      let oferta_id = null;

      response.data.forEach((oferta) => {
        if (String(oferta.projeto_id) === id) {
          oferta_id = oferta.id;
        }
      });

      return oferta_id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Erro ao carregar oferta do projeto.";
      setError(errorMessage);
      toast({
        title: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPropostas();
  }, []);

  const filteredPropostas = propostas.filter((proposta) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    switch (filterType) {
      case "proposta":
        return proposta.nome.toLowerCase().includes(searchLower);
      case "ict":
        return proposta.descricao.toLowerCase().includes(searchLower);
      case "dataCricao":
        return new Date(proposta.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchLower);
      default:
        return true;
    }
  });

  return (
    <MainWrapper title="Propostas ao projeto">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex col-span-2 md:col-span-1">
          <Select
            defaultValue="proposta"
            onValueChange={(value) => setFilterType(value)}
          >
            <SelectTrigger className="w-max rounded-r-none border-r-0">
              <SelectValue>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span className="mr-2">
                    {filters.find((f) => f.value === filterType)?.label}
                  </span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {filters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex relative w-full">
            <div className="w-full flex-grow">
              <Input
                type="text"
                placeholder="Buscar"
                className="rounded-l-none pl-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Proposta</TableHead>
                <TableHead>ICT</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Data de Envio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Carregando propostas...
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-red-500"
                  >
                    {error}
                  </TableCell>
                </TableRow>
              ) : filteredPropostas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    Nenhuma proposta encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPropostas.map((proposta) => (
                  <TableRow key={proposta.id}>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-200 border border-green-300"
                      >
                        <CheckCircle className="mr-1 h-3 w-3 " />
                        Aprovar proposta
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md relative group">
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {proposta.proposta}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md relative flex items-center group">
                        <span className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border p-1 mr-2 flex items-center justify-center">
                          {proposta.Usuario?.Responsavels[0]?.Ict
                            ?.foto_perfil ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL}${
                                proposta.Usuario?.Responsavels[0]?.Ict
                                  ?.foto_perfil
                              }`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Image />
                          )}
                        </span>
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {proposta.Usuario?.Responsavels[0]?.Ict?.nome}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md relative group">
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {proposta.Usuario?.nome}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md relative group">
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {proposta.Usuario?.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md relative group">
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {proposta.Usuario?.telefone.replace(
                            /(\d{2})(\d{2})(\d{4})(\d{4})/,
                            "+$1 ($2) $3-$4"
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDatetime(proposta.createdAt) || "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainWrapper>
  );
};
