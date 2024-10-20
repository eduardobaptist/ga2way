import React, { useState } from "react";
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
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
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
import { ChevronsUpDown, Check } from "lucide-react";
import { FloatingLabelInput } from "../ui/floating-label-input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const projectFormSchema = z
  .object({
    nome: z.string().min(1, "Nome é obrigatório"),
    descricao: z.string().min(1, "Descrição é obrigatória"),
    programa: z.string().min(1, "Programa é obrigatório"),
    trl: z.string().min(1, "Nível TRL é obrigatório"),
    acatech: z.string().min(1, "Nível ACATECH é obrigatório"),
    prioridade: z.string().min(1, "Prioridade é obrigatória"),
    impulso: z.boolean(),
    impulsoTipo: z.string().optional(),
  })
  .refine((data) => !data.impulso || !!data.impulsoTipo, {
    message: "Tipo de impulso é obrigatório quando possui impulso acadêmico",
    path: ["impulsoTipo"],
  });

const ProjectForm = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [hasImpulso, setHasImpulso] = useState(false);

  const form = useForm({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      programa: "",
      trl: "",
      acatech: "",
      prioridade: "",
      impulso: false,
      impulsoTipo: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    navigate("/rotas/programas/projetos");
  };

  const programas = [
    { value: "1", label: "Inteligência Artificial > Gerando o futuro" },
    { value: "2", label: "Automação Industrial" },
    { value: "3", label: "Automação de Testes" },
    { value: "4", label: "Robótica" },
    { value: "5", label: "Ciência de Dados" },
  ];

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput {...field} label="Nome" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput {...field} label="Descrição" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="md:col-span-1 lg:col-span-2">
            <FormField
              control={form.control}
              name="programa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programa do projeto</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {field.value
                          ? programas.find((prog) => prog.value === field.value)
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
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {renderSelect("trl", "Nível TRL", [
            { value: "1", label: "1. A teoria" },
            { value: "2", label: "2. O protótipo" },
            { value: "3", label: "3. O MVP" },
          ])}
          {renderSelect("acatech", "Nível ACATECH", [
            { value: "1", label: "1. Computadorização" },
            { value: "2", label: "2. Conectividade" },
            { value: "3", label: "3. Visibilidade" },
          ])}
          {renderSelect("prioridade", "Prioridade", [
            { value: "1", label: "Baixa" },
            { value: "2", label: "Média" },
            { value: "3", label: "Alta" },
          ])}
        </div>

        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="impulso"
            render={({ field }) => (
              <FormItem>
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

          {hasImpulso &&
            renderSelect("impulsoTipo", "Tipo de Impulso", [
              { value: "1", label: "Estágio" },
              { value: "2", label: "Bolsa" },
              { value: "3", label: "Infraestrutura" },
            ])}
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Salvar Projeto
        </Button>
      </form>
    </Form>
  );
};

export default ProjectForm;
