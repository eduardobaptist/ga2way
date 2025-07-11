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
import { RotasActions } from "./RotasActions";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { formatDatetime } from "@/lib/utils";
import api from "@/axios.config";
import { InfoSection } from "@/components/InfoSection";

export const RotasList = () => {
  const [filterType, setFilterType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");
  const [rotas, setRotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { value: "nome", label: "Nome" },
    { value: "empresa", label: "Empresa" },
    { value: "descricao", label: "Descrição" },
    { value: "dataCriacao", label: "Data de Criação" },
  ];

  const fetchRotas = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/rotas");
      setRotas(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Erro ao carregar rotas.";
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
    fetchRotas();
  }, []);

  const filteredRotas = rotas.filter((rota) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    switch (filterType) {
      case "nome":
        return rota.nome.toLowerCase().includes(searchLower);
      case "empresa":
        return rota.Empresa?.nome?.toLowerCase().includes(searchLower);
      case "descricao":
        return rota.descricao.toLowerCase().includes(searchLower);
      case "dataCriacao":
        return new Date(rota.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchLower);
      default:
        return true;
    }
  });

  return (
    <MainWrapper title="Rotas">
      <InfoSection
        title="Sistema de rotas"
        description="Clique para ver mais informações"
        sections={[
          {
            title: "Gerenciamento de Rotas",
            content: "As rotas são a definição do escopo dos seus programas (e consequentemente dos projetos desses programas). \nElas podem erepresentar no Gate2Way as diferentes áreas do conhecimento, setores da empresa ou temas específico de interesse do projetos que se originem nesta"
          },
        ]}
      />
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
          <Link to="/rotas/novo">
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
                <TableHead>Empresa</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Data de Alteração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" />
                      Carregando rotas...
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-red-500"
                  >
                    {error}
                  </TableCell>
                </TableRow>
              ) : filteredRotas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    Nenhuma rota encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRotas.map((rota) => (
                  <TableRow key={rota.id}>
                    <TableCell>
                      <RotasActions rota={rota} onRefresh={fetchRotas} />
                    </TableCell>
                    <TableCell>{rota.nome}</TableCell>
                    <TableCell>
                      <div className="max-w-md relative group">
                        <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                          {rota.descricao}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{rota.Empresa?.nome || "-"}</TableCell>
                    <TableCell>
                      {formatDatetime(rota.createdAt) || "-"}
                    </TableCell>
                    <TableCell>
                      {formatDatetime(rota.updatedAt) || "-"}
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
