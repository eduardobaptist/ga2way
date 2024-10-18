import { cn } from "@/lib/utils";
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
import { Input } from "../ui/input";
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

import { useNavigate } from "react-router-dom";

const formShema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  senha: z.string().min(1, { message: "Senha é obrigatória" }),
});

const ProjectForm = () => {
  const form = useForm({
    resolver: zodResolver(formShema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log(data);
    login(data);
    navigate("/rotas/programas/projetos");
  };

  const programas = [
    {
      value: "1",
      label: "Inteligência Artificial",
    },
    {
      value: "2",
      label: "Automação industrial",
    },
    {
      value: "3",
      label: "Automação de testes",
    },
    {
      value: "4",
      label: "Robótica",
    },
    {
      value: "5",
      label: "Ciência de dados",
    },
  ];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [hasImpulso, setHasImpulso] = useState(false);
  const handleImpulso = (value) => {
    setHasImpulso(value);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id="projectNome"
                      label="Nome"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            );
          }}
        />
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      id="projectDescricao"
                      label="Descrição"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            );
          }}
        />
        <div className="grid grid-cols-4 gap-4 col-span-2">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => {
              return (
                <div className="col-span-2 md:col-span-1">
                  <FormItem>
                    <div>
                      <FormLabel>Programa do projeto</FormLabel>
                    </div>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {value
                              ? programas.find(
                                  (programas) => programas.value === value
                                )?.label
                              : "Selecione"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Buscar programa..." />
                            <CommandList>
                              <CommandEmpty>Nenhum encontrado.</CommandEmpty>
                              <CommandGroup>
                                {programas.map((programa) => (
                                  <CommandItem
                                    key={programa.value}
                                    onSelect={() => {
                                      setValue(
                                        programa.value === value
                                          ? ""
                                          : programa.value
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        value === programa.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {programa.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              );
            }}
          />
          <FormField
            control={form.control}
            name="trl"
            render={({ field }) => {
              return (
                <div className="col-span-2 md:col-span-1">
                  <FormItem>
                    <FormLabel>Nível TRL</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1. A teoria</SelectItem>
                          <SelectItem value="2">2. O protótipo</SelectItem>
                          <SelectItem value="3">3. O MVP</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              );
            }}
          />
          <FormField
            control={form.control}
            name="acatech"
            render={({ field }) => {
              return (
                <div className="col-span-2 md:col-span-1">
                  <FormItem>
                    <FormLabel>Nível ACATECH</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1. Computadorização</SelectItem>
                          <SelectItem value="2">2. Conectividade</SelectItem>
                          <SelectItem value="3">3. Visibilidade</SelectItem>
                          <SelectItem value="4">4. Transparência</SelectItem>
                          <SelectItem value="5">
                            5. Capacidade preditiva
                          </SelectItem>
                          <SelectItem value="6">6. Adaptabilidade</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              );
            }}
          />
          <FormField
            control={form.control}
            name="prioridade"
            render={({ field }) => {
              return (
                <div className="col-span-2 md:col-span-1">
                  <FormItem>
                    <FormLabel>Prioridade</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Baixa</SelectItem>
                          <SelectItem value="2">Média</SelectItem>
                          <SelectItem value="3">Alta</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="impulso"
          render={({ field }) => {
            return (
              <div className="col-span-2 md:col-span-1">
                <FormItem className="space-y-3">
                  <FormLabel>Esse projeto possui impulso acadêmico? </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={() => {field.onChange; handleImpulso(field.value)}}
                      defaultValue={hasImpulso}
                      className="flex items-center gap-5"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={true} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Sim
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={false} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Não
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            );
          }}
        />
      </form>
    </Form>
  );
};

export default ProjectForm;
