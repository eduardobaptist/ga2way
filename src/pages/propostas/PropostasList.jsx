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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Loader2, ImageOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatDatetime } from "@/lib/utils";
import api from "@/axios";
import { Badge } from "@/components/ui/badge";

export const PropostasList = () => {
  const [filterType, setFilterType] = useState("proposta");
  const [searchTerm, setSearchTerm] = useState("");
  const [propostas, setPropostas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filters = [{ value: "proposta", label: "Proposta" }];

  const fetchPropostas = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/interesses");
      console.log(response.data);
      setPropostas(response.data || []);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro ao carregar propostas.";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
      setPropostas([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPropostas();
  }, []);

  const getStatusConfig = (status) => {
    const configs = {
      aceito: {
        variant: "default",
        className: "bg-green-100 hover:bg-green-200 text-green-700",
        label: "Aceito",
      },
      rejeitado: {
        variant: "destructive",
        className: "bg-red-100 hover:bg-red-200 text-red-700",
        label: "Rejeitado",
      },
      pendente: {
        variant: "secondary",
        className: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700",
        label: "Pendente",
      },
    };
    return configs[status.toLowerCase()] || configs.pendente;
  };

  const filteredPropostas = propostas.filter((proposta) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    switch (filterType) {
      case "proposta":
        return proposta.proposta.toLowerCase().includes(searchLower);
      default:
        return true;
    }
  });

  return (
    <MainWrapper title="Minhas propostas">
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
                <TableHead>Proposta</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Empresa</TableHead>
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
                      <div className="max-w-md relative group">
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {proposta.proposta}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const config = getStatusConfig(proposta.status);
                        return (
                          <Badge className={config.className}>
                            {config.label}
                          </Badge>
                        );
                      })()}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md relative flex items-center group">
                        <span className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border p-1 mr-2 flex items-center justify-center">
                          {proposta?.Oferta?.Projeto?.Programa?.Rota?.Empresa
                            ?.foto_perfil ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL}${
                                proposta.Oferta.Projeto.Programa.Rota.Empresa
                                  .foto_perfil
                              }`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <ImageOff className="w-4 h-4 text-muted-foreground" />
                          )}
                        </span>
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {proposta.Oferta.Projeto.Programa.Rota.Empresa.nome}
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
