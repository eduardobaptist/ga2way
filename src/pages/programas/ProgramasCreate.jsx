import { useAuthStore } from "@/stores/useAuthStore";
import { useState, useEffect } from "react";
import { MainWrapper } from "@/components/MainWrapper";
import { Link, useNavigate } from "react-router-dom";
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
import {
  Check,
  ChevronsUpDown,
  ArrowLeftCircle,
  CheckCircleIcon,
  Loader2,
} from "lucide-react";
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

import { toast } from "@/hooks/use-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/axios.config";
import { RequiredFieldSpan } from "@/components/RequiredFieldSpan";

const programaFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  rota_id: z.number().min(1, "Selecione uma rota"),
});

export const ProgramasCreate = () => {
  const [rotas, setRotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const empresa_id = useAuthStore((state) => state.getUserEmpresaId());

  const fetchRotas = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/rotas");
      setRotas(
        response.data.map((rota) => ({
          value: rota.id,
          label: rota.nome,
        }))
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Erro ao carregar rotas.";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [open, setOpen] = useState(false);

  const handleRotas = () => {
    setOpen(!open);
    if (!open && rotas.length === 0) {
      fetchRotas();
    }
  };

  const handleSave = () => {
    form.handleSubmit(handleSubmit)();
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await api.post("/programas", {
        ...data,
        empresa_id
      });

      toast({
        title: "Programa criado com sucesso.",
        variant: "success",
      });

      navigate("/programas");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Erro ao criar programa. Tente novamente.";

      toast({
        title: errorMessage,
        variant: "destructive",
      });

      if (error.response?.status === 403) {
        form.setError("root", {
          type: "manual",
          message:
            "Você não tem permissão para criar programas para outras empresas.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm({
    resolver: zodResolver(programaFormSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      rota_id: 0,
    },
  });

  return (
    <MainWrapper title="Novo programa">
      <div className="flex items-center justify-between">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="bg-[var(--azul-agregar)] text-white hover:text-white hover:bg-[var(--azul-agregar-hover)]"
              variant="outline"
              disabled={isSubmitting}
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
              <AlertDialogCancel disabled={isSubmitting}>
                Cancelar
              </AlertDialogCancel>
              <Link to="/programas">
                <AlertDialogAction
                  className="w-full md:w-fit"
                  disabled={isSubmitting}
                >
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
          disabled={isSubmitting}
        >
          <CheckCircleIcon className="mr-2" size="20" />
          {isSubmitting ? "Salvando..." : "Salvar"}
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
                    <FormLabel>Nome <RequiredFieldSpan /></FormLabel>
                    <FormControl>
                      <Input type="text" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="rota_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rota do programa <RequiredFieldSpan /></FormLabel>
                  <Popover open={open} onOpenChange={handleRotas}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        disabled={isSubmitting}
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
                        <CommandInput
                          placeholder="Buscar rota..."
                          disabled={isSubmitting}
                        />
                        {isLoading ? (
                          <div className="flex my-3 items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            Carregando rotas...
                          </div>
                        ) : (
                          <CommandList>
                            <CommandEmpty>
                              Nenhuma rota encontrada.
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
                        )}
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
                    <FormLabel>Descrição <RequiredFieldSpan /></FormLabel>
                    <FormControl>
                      <Input type="text" {...field} disabled={isSubmitting} />
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
