import MainWrapper from "@/components/mainWrapper";
import { useState } from "react";
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
import { Search, PlusCircle, Filter } from "lucide-react";
import ProgramasActions from "./programasActions";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import api from "@/config/axios.config";

const Programas = () => {
  const [filterType, setFilterType] = useState("nome");
  const filters = [
    { value: "nome", label: "Nome" },
    { value: "empresa", label: "Empresa" },
    { value: "rota", label: "Rota do programa" },
    { value: "descricao", label: "Descrição" },
    { value: "dataCricao", label: "Data de criação" },
  ];

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
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <ProgramasActions />
                </TableCell>
                <TableCell>Bootcamp de python</TableCell>
                <TableCell>
                  <div className="max-w-md relative group">
                    <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                      Lorem ipsum dolor sit amet. Hic possimus velit sit
                      suscipit dolorem non voluptatem officia rem sunt quod.
                    </div>
                  </div>
                </TableCell>
                <TableCell>Automação de Processos</TableCell>
                <TableCell>Bruning Tecnometal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <ProgramasActions />
                </TableCell>
                <TableCell>Gerando o futuro</TableCell>
                <TableCell>
                  <div className="max-w-md relative group">
                    <div className="truncate group-hover:whitespace-normal transition-all duration-300 ease-in-out hover:scale-100 opacity-90 hover:opacity-100">
                      Lorem ipsum dolor sit amet. Hic possimus velit sit
                      suscipit dolorem non voluptatem officia rem sunt quod.
                    </div>
                  </div>
                </TableCell>
                <TableCell>Inteligência Artificial (IA)</TableCell>
                <TableCell>Bruning Tecnometal</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </MainWrapper>
  );
};

export default Programas;
