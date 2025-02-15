import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validarCnpj } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";

import { MoveRight } from "lucide-react";
import { redirect } from "react-router-dom";

const formShema = z.object({
  nomeOficial: z.string().min(1, { message: "Nome oficial é obrigatório" }),
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  telefone: z
    .string()
    .regex(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
      { message: "Telefone inválido" }
    ),
  responsavelNomeCompleto: z
    .string()
    .min(1, { message: "Nome completo é obrigatório" }),
  responsavelFuncao: z.string().min(1, { message: "Função é obrigatória" }),
});

export const RegisterFormIct = ({ closeDialog }) => {
  const form = useForm({
    resolver: zodResolver(formShema),
    defaultValues: {
      nomeOficial: "",
      email: "",
      telefone: "",
      responsavelNomeCompleto: "",
      responsavelFuncao: "",
    },
  });

  const { toast } = useToast();

  const handleSubmit = (data) => {
    console.log(data);
    toast({
      variant: "success",
      title: "Dados enviados com sucesso!",
      description: "Após aprovação, você receberá acesso por e-mail.",
    });
    closeDialog();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center col-span-2">
            <span class="pr-2 text-xs font-bold">Dados da ICT</span>
            <hr class="flex-grow" />
          </div>
          <FormField
            control={form.control}
            name="nomeOficial"
            render={({ field }) => {
              return (
                <div className="col-span-2">
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        id="nomeOficial"
                        label="Nome oficial"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <div className="col-span-2 md:col-span-1">
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput {...field} id="email" label="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => {
              return (
                <div className="col-span-2 md:col-span-1">
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        id="telefone"
                        label="Telefone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              );
            }}
          ></FormField>
          <div className="flex items-center col-span-2">
            <span class="pr-2 text-xs font-bold">Dados do responsável</span>
            <hr class="flex-grow" />
          </div>
          <FormField
            control={form.control}
            name="responsavelNomeCompleto"
            render={({ field }) => {
              return (
                <div className="col-span-2">
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        id="responsavelNomeCompleto"
                        label="Nome completo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="responsavelFuncao"
            render={({ field }) => {
              return (
                <div className="col-span-2">
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        id="responsavelFuncao"
                        label="Função"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              );
            }}
          ></FormField>
          <Button
            type="submit"
            className="w-full bg-[var(--azul-agregar)] hover:bg-[var(--azul-agregar-hover)] col-span-2"
          >
            Enviar <MoveRight className="mx-1" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
