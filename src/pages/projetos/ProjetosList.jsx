import bruningLogo from "../../assets/img/bruning-logo-redondo.png";
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
  Clock,
  Grid,
  List,
  Search,
  PlusCircle,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import api from "@/axios.config";

export const ProjetosList = () => {
  const fetchProjetos = async () => {
    try {
      const response = await api.get("/projetos");
      console.log(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar projetos",
        description:
          error.response?.data?.message ||
          "Não foi possível carregar os projetos.",
      });
    }
  };

  // useEffect(() => {
  //   fetchProjetos();
  // }, []);
  const [layout, setLayout] = useState("grid");
  const [filterType, setFilterType] = useState("nome");
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
                <Grid size="20" />
              </TabsTrigger>
              <TabsTrigger value="list">
                <List size="20" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Link to="/rotas/programas/projetos/novo">
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
        {layout === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className="w-full h-max col-span-1 shadow-lg">
                <CardHeader className="gap-2">
                  <div className="flex items-start justify-between">
                    <div className="flex">
                      <img src={bruningLogo} alt="" className="h-12 w-auto" />
                      <div className="flex flex-col gap-1 ml-2">
                        <CardTitle>Modelagem UML</CardTitle>
                        <p className="text-sm font-semibold">
                          Bruning Tecnometal
                        </p>
                      </div>
                    </div>
                    <ProjetosActions />
                  </div>
                  <div className="w-max flex gap-2">
                    <Badge variant="secondary">Projeto</Badge>
                    <Badge variant="secondary">Aberto</Badge>
                  </div>
                  <CardDescription>
                    Lorem ipsum dolor sit amet. Hic possimus velit sit suscipit
                    dolorem non voluptatem officia rem sunt quod.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="border-t p-2 flex items-center">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex">
                      <Clock size={20} className="mr-2" />
                      <span className="text-sm tracking-tight">
                        Criado há dois dias
                      </span>
                    </div>
                    <DollarSign size={20} className="text-red-600" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="w-[200px]">Status</TableHead>
                  <TableHead className="text-right">
                    Impulso Acadêmico
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <ProjetosActions />
                  </TableCell>
                  <TableCell>Teste de Segurança</TableCell>
                  <TableCell>
                    <div className="max-w-md relative group">
                      <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                        Lorem ipsum dolor sit amet. Hic possimus velit sit
                        suscipit dolorem non voluptatem officia rem sunt quod.
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-300">
                      Aberto
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">Sim</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <ProjetosActions />
                  </TableCell>
                  <TableCell>Modelagem UML</TableCell>
                  <TableCell>
                    <div className="max-w-md relative group">
                      <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                        Lorem ipsum dolor sit amet. Hic possimus velit sit
                        suscipit dolorem non voluptatem officia rem sunt quod.
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-300">
                      Finalizado
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">Não</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </MainWrapper>
  );
};
