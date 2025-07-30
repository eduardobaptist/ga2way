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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Loader2,
  ImageOff,
  CheckCircle,
  AlertTriangle,
  CircleAlert,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatDatetime } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import api from "@/axios";

export const ParceriasList = () => {
  const [filterType, setFilterType] = useState("proposta");
  const [searchTerm, setSearchTerm] = useState("");
  const [parcerias, setParcerias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { value: "proposta", label: "Proposta" },
    { value: "ict", label: "ICT" },
    { value: "dataCricao", label: "Data de Criação" },
  ];

  const fetchParcerias = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/parcerias");
      setParcerias(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Erro ao carregar parcerias.";
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
    fetchParcerias();
  }, []);

  const filteredParcerias = (parcerias || []).filter((parceria) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    switch (filterType) {
      case "perceria":
        return perceria.nome.toLowerCase().includes(searchLower);
      case "ict":
        return perceria.descricao.toLowerCase().includes(searchLower);
      case "dataCricao":
        return new Date(perceria.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchLower);
      default:
        return true;
    }
  });

  return (
    <MainWrapper title="Parcerias">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex col-span-2 md:col-span-1">
          <Select
            defaultValue="parceria"
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
                <TableHead>Projeto</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>ICT</TableHead>
                <TableHead>Responsável da ICT</TableHead>
                <TableHead>E-mail do responsável da ICT</TableHead>
                <TableHead>Data de Criação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Carregando parcerias...
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
              ) : filteredParcerias.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    Nenhuma parceria encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredParcerias.map((parceria) => (
                  <TableRow key={parceria.id}>
                    <TableCell>
                      <div className="max-w-md relative group">
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {parceria.Interesse?.proposta}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md relative group">
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {parceria.Interesse?.Oferta?.Projeto?.nome}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md relative flex items-center group">
                        <span className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border flex items-center justify-center">
                          {parceria.Interesse?.Oferta?.Projeto?.Programa?.Rota
                            .Empresa?.foto_perfil ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL}${
                                parceria.Interesse?.Oferta?.Projeto?.Programa
                                  ?.Rota.Empresa?.foto_perfil
                              }`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <ImageOff className="w-4 h-4 text-muted-foreground" />
                          )}
                        </span>
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {
                            parceria.Interesse?.Oferta?.Projeto?.Programa?.Rota
                              .Empresa?.nome
                          }
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md relative flex items-center group">
                        <span className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border p-1 mr-2 flex items-center justify-center">
                          {parceria.Interesse?.Usuario?.Responsavels[0]?.Ict
                            ?.foto_perfil ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL}${
                                parceria.Interesse?.Usuario?.Responsavels[0]
                                  ?.Ict?.foto_perfil
                              }`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Image />
                          )}
                        </span>
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {
                            parceria.Interesse?.Usuario?.Responsavels[0]?.Ict
                              ?.nome
                          }
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md relative group">
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {parceria.Interesse?.Usuario?.nome}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md relative group">
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {parceria.Interesse?.Usuario?.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDatetime(parceria.createdAt) || "-"}
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
