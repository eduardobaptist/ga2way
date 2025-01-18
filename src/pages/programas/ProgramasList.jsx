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
import { Search, PlusCircle, Filter, Loader2 } from "lucide-react";
import { ProgramasActions } from "./ProgramasActions";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { formatDatetime } from "@/lib/utils";
import api from "@/axios.config";

export const ProgramasList = () => {
  const [filterType, setFilterType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");
  const [programas, setProgramas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { value: "nome", label: "Nome" },
    { value: "empresa", label: "Empresa" },
    { value: "rota", label: "Rota" },
    { value: "descricao", label: "Descrição" },
    { value: "dataCricao", label: "Criação" },
  ];

  const fetchProgramas = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/programas");
      setProgramas(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Erro ao carregar programas.";
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
    fetchProgramas();
  }, []);

  const filteredProgramas = programas.filter((programa) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    switch (filterType) {
      case "nome":
        return programa.nome.toLowerCase().includes(searchLower);
      case "empresa":
        return programa.Empresa?.nome?.toLowerCase().includes(searchLower);
      case "rota":
        return programa.Rota?.nome?.toLowerCase().includes(searchLower);
      case "descricao":
        return programa.descricao.toLowerCase().includes(searchLower);
      case "dataCricao":
        return new Date(programa.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchLower);
      default:
        return true;
    }
  });

  return (
    <MainWrapper title="Programas">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex col-span-2 md:col-span-1">
          <Select
            defaultValue="nome"
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
        <div className="flex justify-between md:justify-end col-span-2 md:col-span-1 gap-2">
          <Link to="/rotas/programas/novo">
            <Button
              className="bg-[var(--azul-agregar)] text-white hover:text-white hover:bg-[var(--azul-agregar-hover)]"
              variant="outline"
            >
              <PlusCircle className="mr-2" size="20" />
              Novo
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-5">
        <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Rota</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Criação</TableHead>
                <TableHead>Alteração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Carregando programas...
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
              ) : filteredProgramas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    Nenhum programa encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProgramas.map((programa) => (
                  <TableRow key={programa.id}>
                    <TableCell>
                      <ProgramasActions
                        programa={programa}
                        onRefresh={fetchProgramas}
                      />
                    </TableCell>
                    <TableCell>{programa.nome}</TableCell>
                    <TableCell>
                      <div className="max-w-md relative group">
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {programa.descricao}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{programa.Rota?.nome || "-"}</TableCell>
                    <TableCell>{programa.Empresa?.nome || "-"}</TableCell>
                    <TableCell>
                      {formatDatetime(programa.createdAt) || "-"}
                    </TableCell>
                    <TableCell>
                      {formatDatetime(programa.updatedAt) || "-"}
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
