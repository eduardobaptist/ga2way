import { MainWrapper } from "@/components/MainWrapper";
import { ProjetosActions } from "./ProjetosActions";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  Calendar,
  Grid,
  List,
  Search,
  PlusCircle,
  Filter,
  ImageOff,
  EyeOff,
  Eye,
  Hourglass,
  SearchX,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import api from "@/axios";
import { cn, formatDatetime } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export const ProjetosList = () => {
  const [layout, setLayout] = useState("grid");
  const [filterType, setFilterType] = useState("nome");
  const [projetos, setProjetos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const userTipo = user?.tipo;

  const navigate = useNavigate();

  const handleCardOnClick = (id) => {
    navigate(`/projetos/${id}`)
  }

  const fetchProjetos = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/projetos");
      setProjetos(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar projetos",
        description:
          error.response?.data?.message ||
          "Não foi possível carregar os projetos.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjetos();
  }, []);

  const filters = [
    { value: "nome", label: "Nome" },
    { value: "empresa", label: "Empresa" },
    { value: "status", label: "Status" },
    { value: "data", label: "Data" },
  ];

  return (
    <MainWrapper title="Projetos">
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
              />
            </div>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex justify-between md:justify-end col-span-2 md:col-span-1 gap-2">
          <Tabs
            value={layout}
            defaultValue="grid"
            className="w-max"
            onValueChange={setLayout}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">
                <Grid size="20" className="mr-2" /> Cards
              </TabsTrigger>
              <TabsTrigger value="list">
                <List size="20" className="mr-2" /> Lista
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {["admin", "empresa"].includes(userTipo) ? (
            <Link to="/projetos/novo">
              <Button
                className="bg-[var(--azul-agregar)] text-white hover:text-white hover:bg-[var(--azul-agregar-hover)]"
                variant="outline"
              >
                <PlusCircle className="mr-2" size="20" />
                Novo
              </Button>
            </Link>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        {layout === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {projetos.length > 0 ? (
              projetos.map((projeto) => (
                <Card
                  key={projeto.id}
                  className="w-full col-span-1 shadow-md flex flex-col relative transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.0] hover:z-10 cursor-pointer"
                  onClick={() => handleCardOnClick(projeto.id)}
                >
                  {projeto.total_interesses &&
                    projeto.status === "PUBLICADO" &&
                    ["admin", "empresa"].includes(userTipo) ? (
                    <div className="absolute -top-2 -right-2 z-10">
                      <Badge className="bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded-full border border-white shadow-md">
                        {projeto.total_interesses <= 99
                          ? projeto.total_interesses
                          : "+99"}
                      </Badge>
                    </div>
                  ) : null}

                  <CardHeader className="gap-2">
                    <div className="flex items-start justify-between">
                      <div className="flex overflow-hidden max-w-[calc(100%-40px)]">
                        <span className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border p-1 flex items-center justify-center">
                          {projeto?.Programa?.Rota?.Empresa?.foto_perfil ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL}${projeto.Programa.Rota.Empresa.foto_perfil
                                }`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <ImageOff />
                          )}
                        </span>
                        <div className="flex flex-col gap-1 ml-2 overflow-hidden min-w-0">
                          <CardTitle className="truncate">

                            {projeto.nome}

                          </CardTitle>
                          <p className="text-sm font-semibold">
                            {projeto?.Programa?.Rota?.Empresa?.nome}
                          </p>
                        </div>
                      </div>
                      <ProjetosActions
                        projeto={projeto}
                        onRefresh={fetchProjetos}
                      />
                    </div>
                    <div className="w-max flex gap-2">
                      {projeto.status === "NÃO PÚBLICADO" ? (
                        <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300">
                          <EyeOff className="mr-1 h-3 w-3" />
                          Rascunho
                        </Badge>
                      ) : projeto.status === "EM ANDAMENTO" ? (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-300">
                          <Hourglass className="mr-1 h-3 w-3" />
                          Em andamento
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border border-green-300">
                          <Eye className="mr-1 h-3 w-3" />
                          Publicado
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="h-full">
                      {projeto.descricao}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="border-t p-2 flex items-center mt-auto">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center">
                        <Calendar
                          size={15}
                          className="mr-2 text-muted-foreground"
                        />
                        <span className="text-sm tracking-tight">
                          Criado em {formatDatetime(projeto.createdAt)}
                        </span>
                      </div>
                      <DollarSign
                        size={20}
                        className={cn(
                          projeto.impulso_id && "text-green-600",
                          !projeto.impulso_id && "text-red-600"
                        )}
                      />
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : isLoading ? (
              <div className="col-span-full flex justify-center items-center p-8 bg-white rounded-lg border border-slate-200 h-[calc(100vh-280px)] min-h-[500px] w-full">
                <div className="flex flex-col items-center text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-slate-400 mb-4" />
                  <h2 className="text-2xl font-semibold text-slate-700">
                    Carregando projetos...
                  </h2>
                </div>
              </div>
            ) : (
              <div className="col-span-full flex justify-center items-center p-8 bg-white rounded-lg border border-slate-200 h-[calc(100vh-280px)] min-h-[500px] w-full">
                <div className="flex flex-col items-center text-center max-w-md">
                  <div className="bg-slate-50 p-6 rounded-full mb-6">
                    <SearchX className="h-16 w-16 text-slate-400" />
                  </div>

                  <h2 className="text-2xl font-semibold text-slate-700 mb-3">
                    Nenhum projeto encontrado
                  </h2>

                  <p className="text-slate-500 mb-6">
                    {["admin", "empresa"].includes(userTipo)
                      ? "Não foram encontrados projetos com os filtros atuais. Tente ajustar os filtros ou crie um novo projeto."
                      : "Não foram encontrados projetos com os filtros atuais. Tente ajustar os critérios de busca."}
                  </p>

                  {["admin", "empresa"].includes(userTipo) && (
                    <Link to="/projetos/novo">
                      <Button
                        className="bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
                      >
                        Criar novo projeto
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )
            }
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Nome do Projeto</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead className="w-[200px]">Status</TableHead>
                  <TableHead className="text-right">
                    Impulso Acadêmico
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        Carregando projetos...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : projetos.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-gray-500"
                    >
                      Nenhum projeto encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  projetos.map((projeto) => (
                    <TableRow>
                      <TableCell>
                        <div className="relative">
                          <ProjetosActions
                            projeto={projeto}
                            onRefresh={fetchProjetos}
                          />
                        </div>
                      </TableCell>
                      <TableCell>{projeto.nome}</TableCell>
                      <TableCell>
                        <div className="max-w-md relative group">
                          <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                            {projeto.descricao}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="truncate">
                          {projeto?.Programa?.Rota?.Empresa?.nome}
                        </div>
                      </TableCell>
                      <TableCell>
                        {projeto.status === "NÃO PÚBLICADO" ? (
                          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300">
                            <EyeOff className="mr-1 h-3 w-3" />
                            Rascunho
                          </Badge>
                        ) : projeto.status === "EM ANDAMENTO" ? (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-300">
                            <Hourglass className="mr-1 h-3 w-3" />
                            Em andamento
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border border-green-300">
                            <Eye className="mr-1 h-3 w-3" />
                            Publicado
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {projeto.impulso_id ? "Sim" : "Não"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </MainWrapper>
  );
};