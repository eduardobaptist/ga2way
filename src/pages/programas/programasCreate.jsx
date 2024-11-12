import { useState } from "react";
import MainWrapper from "@/components/mainWrapper";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, ArrowLeftCircle, CheckCircleIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const rotaFormShema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
});

const ProgramasCreate = () => {
  const [open, setOpen] = useState(false);
  const handleSave = () => {
    form.handleSubmit(handleSubmit)();
  };

  const handleSubmit = (data) => {
    console.log(data);
  };

  const form = useForm({
    resolver: zodResolver(rotaFormShema),
    defaultValues: {
      nome: "",
      descricao: "",
    },
  });

  const rotas = [
    { value: "1", label: "Inteligência Artificial > Gerando o futuro" },
    { value: "2", label: "Automação Industrial" },
    { value: "3", label: "Automação de Testes" },
    { value: "4", label: "Robótica" },
    { value: "5", label: "Ciência de Dados" },
  ];

  return (
    <MainWrapper title="Novo programa">
      <div className="flex items-center justify-between">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="bg-[var(--azul-agregar)] text-white hover:text-white hover:bg-[var(--azul-agregar-hover)]"
              variant="outline"
            >
              <ArrowLeftCircle className="mr-2" size="20" />
              Voltar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja fechar?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Os dados inseridos serão perdidos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Link to="/rotas/programas">
                <AlertDialogAction className="w-full md:w-fit">
                  Continuar
                </AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          className="bg-green-500 text-white font-bold hover:text-white hover:bg-green-600"
          variant="outline"
          onClick={handleSave}
        >
          <CheckCircleIcon className="mr-2" size="20" />
          Salvar
        </Button>
      </div>

      <div className="mt-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="rota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rota do programa</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {field.value
                          ? rotas.find((prog) => prog.value === field.value)
                              ?.label
                          : "Selecione"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar programa..." />
                        <CommandList>
                          <CommandEmpty>
                            Nenhum programa encontrado.
                          </CommandEmpty>
                          <CommandGroup>
                            {rotas.map((prog) => (
                              <CommandItem
                                key={prog.value}
                                onSelect={() => {
                                  field.onChange(prog.value);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === prog.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {prog.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-2">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </div>
    </MainWrapper>
  );
};

export default ProgramasCreate;
