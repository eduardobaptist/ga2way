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
import { Search, PlusCircle, Filter, Loader2, Cog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { formatDatetime } from "@/lib/utils";
import api from "@/axios.config";
import { ImpulsosActions } from "./ImpulsosActions";

export const ImpulsosList = () => {
  const [filterType, setFilterType] = useState("descricao");
  const [searchTerm, setSearchTerm] = useState("");
  const [impulsos, setImpulsos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { value: "descricao", label: "Descrição" },
    { value: "valor", label: "Valor" },
    { value: "dataCriacao", label: "Data de Criação" },
  ];

  const fetchImpulsos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/impulsos");
      console.log(response.data);
      setImpulsos(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Erro ao carregar impulsos.";
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
    fetchImpulsos();
  }, []);

  const filteredImpulsos = impulsos.filter((impulso) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    switch (filterType) {
      case "descricao":
        return impulso.descricao.toLowerCase().includes(searchLower);
      case "valor":
        return impulso.valor > Number.parseFloat(searchLower);
      case "dataCriacao":
        return new Date(impulso.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(searchLower);
      default:
        return true;
    }
  });

  return (
    <MainWrapper title="Impulsos acadêmicos">
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
          <Link to="/impulsos/novo">
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
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[50px]">Ações</TableHead>
                <TableHead className="min-w-[300px]">Descrição</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="whitespace-nowrap">Criação</TableHead>
                <TableHead className="whitespace-nowrap">Alteração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Carregando impulsos...
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center">
                    <div className="flex items-center justify-center gap-2 text-destructive">
                      <AlertCircle className="h-5 w-5" />
                      <span>{error}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredImpulsos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="h-6 w-6 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Nenhum impulso acadêmico encontrado
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchImpulsos}
                      >
                        Recarregar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredImpulsos.map((impulso) => (
                  <TableRow
                    key={impulso.id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell>
                      <ImpulsosActions
                        impulso={impulso}
                        onRefresh={fetchImpulsos}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 max-w-[400px]">
                        <span className="truncate">{impulso.descricao}</span>
                        {!impulso.empresa_id && (
                          <Badge className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100">
                            <Cog className="h-3.5 w-3.5 mr-1" />
                            Padrão do sistema
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={`font-medium ${
                          parseFloat(impulso.valor) > 0
                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50 hover:text-green-700"
                            : "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-100 hover:text-slate-800"
                        }`}
                      >
                        {parseFloat(impulso.valor).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDatetime(impulso.createdAt) || "-"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {formatDatetime(impulso.updatedAt) || "-"}
                      </div>
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
