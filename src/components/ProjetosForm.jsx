import React, { useState, forwardRef } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { ChevronsUpDown, Check, Loader2, CalendarIcon, Upload } from 'lucide-react';
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import api from "@/axios.config";

const projectFormSchema = z
  .object({
    nome: z.string().min(1, "Nome é obrigatório"),
    descricao: z.string().min(1, "Descrição é obrigatória"),
    programa_id: z.number().min(1, "Programa é obrigatório"),
    data_inicio: z.date({
      invalid_type_error: "Formato de data inválido",
    }),
    data_fim: z.date({
      invalid_type_error: "Formato de data inválido",
    }),
    trl: z.string().min(1, "Nível TRL é obrigatório"),
    acatech: z.string().min(1, "Nível ACATECH é obrigatório"),
    prioridade: z.string().min(1, "Prioridade é obrigatória"),
    impulso: z.boolean(),
    impulsoTipo: z.string(),
    upload: z
      .instanceof(File)
      .refine(
        (file) => {
          const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.oasis.opendocument.text",
          ];

          const isAllowed = allowedTypes.includes(file.type);

          return isAllowed;
        },
        {
          message:
            "Apenas arquivos PDF, Word (doc, docx), e ODT são permitidos",
        }
      )
      .nullable(),
  })
  .refine((data) => {
    // If impulso is true, impulsoTipo must be selected
    if (data.impulso) {
      return data.impulsoTipo !== "";
    }
    // If impulso is false, we don't care about impulsoTipo
    return true;
  }, {
    message: "Tipo de impulso é obrigatório quando possui impulso acadêmico",
    path: ["impulsoTipo"],
  })
  .refine((data) => data.data_inicio < data.data_fim, {
    message: "A data de início deve ser anterior à data de término",
    path: ["data_inicio"],
  });

export const ProjetosForm = forwardRef(({ onSubmit }, ref) => {
  const [open, setOpen] = useState(false);
  const [hasImpulso, setHasImpulso] = useState(false);
  const [programas, setProgramas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      data_inicio: new Date(),
      data_fim: null,
      programa_id: 0,
      trl: "",
      acatech: "",
      prioridade: "",
      impulso: false,
      impulsoTipo: "",
      upload: null,
    },
  });

  const handleFormSubmit = (data) => {
    if (onSubmit) {
      console.log(data);
      onSubmit(data);
    }
  };

  const fetchProgramas = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/programas");
      setProgramas(
        response.data.map((programa) => ({
          value: programa.id,
          label: programa.nome,
        }))
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Erro ao carregar programas.";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProgramas = () => {
    setOpen(!open);
    if (!open && programas.length === 0) {
      fetchProgramas();
    }
  };

  const renderSelect = (name, label, options) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form
        ref={ref}
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-4">
          <fieldset className="space-y-4 p-4 bg-white rounded-md shadow-sm border border-gray-300 block">
            <legend className="text-md px-2 font-semibold text-gray-800 border-gray-200">
              Geral
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="programa_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Programa do projeto</FormLabel>
                      <Popover open={open} onOpenChange={handleProgramas}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {field.value
                              ? programas.find(
                                  (prog) => prog.value === field.value
                                )?.label
                              : "Selecione"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <Command>
                            <CommandInput placeholder="Buscar programa..." />
                            {isLoading ? (
                              <div className="flex my-3 items-center justify-center">
                                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                                Carregando programas...
                              </div>
                            ) : (
                              <CommandList>
                                <CommandEmpty>
                                  Nenhum programa encontrado.
                                </CommandEmpty>
                                <CommandGroup>
                                  {programas.map((prog) => (
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
              </div>
              <div className="flex flex-col md:flex-row md:gap-8">
                <FormField
                  control={form.control}
                  name="impulso"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel>Possui impulso acadêmico?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value === "true");
                            setHasImpulso(value === "true");
                          }}
                          value={field.value ? "true" : "false"}
                          className="flex gap-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">Sim</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">Não</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {hasImpulso && (
                  <div className="mt-4 md:mt-0 flex-1">
                    {renderSelect("impulsoTipo", "Tipo de Impulso", [
                      { value: "1", label: "Estágio" },
                      { value: "2", label: "Bolsa" },
                      { value: "3", label: "Infraestrutura" },
                    ])}
                  </div>
                )}
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="data_inicio"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de início</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/y", { locale: ptBR })
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="data_fim"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de término</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/y", { locale: ptBR })
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="upload"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>
                        Upload do arquivo com mais informações
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              onChange(file);
                            }}
                            {...field}
                            className="w-full pr-10 cursor-pointer"
                            accept=".pdf,.doc,.docx,.odt"
                          />
                          <Upload className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4 mt-5 p-4 bg-white rounded-md shadow-sm border border-gray-300 block">
            <legend className="text-md px-2 font-semibold text-gray-800 border-gray-200">
              Métricas
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                {renderSelect("trl", "Nível TRL", [
                  { value: "1", label: "1. A teoria" },
                  { value: "2", label: "2. O protótipo" },
                  { value: "3", label: "3. O MVP" },
                ])}
              </div>
              <div>
                {renderSelect("acatech", "Nível ACATECH", [
                  { value: "1", label: "1. Computadorização" },
                  { value: "2", label: "2. Conectividade" },
                  { value: "3", label: "3. Visibilidade" },
                ])}
              </div>
              <div>
                {renderSelect("prioridade", "Prioridade", [
                  { value: "1", label: "Baixa" },
                  { value: "2", label: "Média" },
                  { value: "3", label: "Alta" },
                ])}
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    </Form>
  );
});
