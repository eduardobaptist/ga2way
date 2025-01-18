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

import { Building2, Mail, Info, MoveRight, Check } from "lucide-react";
import { redirect } from "react-router-dom";

const formShema = z.object({
  razaoSocial: z.string().min(1, { message: "Razão social é obrigatória" }),
  cnpj: z
    .string()
    .min(14, { message: "CNPJ precisa ter no mínimo 14 caracteres" })
    .refine(
      (cnpj) => {
        cnpj = cnpj.replace(/[^\d]+/g, "");

        if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

        return validarCnpj(cnpj);
      },
      { message: "CNPJ inválido" }
    ),
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
  empresaDescricao: z
    .string()
    .max(50, { message: "Descrição deve ter até 50 caracteres" }),
  responsavelNomeCompleto: z
    .string()
    .min(1, { message: "Nome completo é obrigatório" }),
  responsavelSetor: z.string().min(1, { message: "Setor é obrigatório" }),
  responsavelCargo: z.string().min(1, { message: "Cargo é obrigatório" }),
});

export const RegisterFormEmpresa = ({ closeDialog }) => {
  const form = useForm({
    resolver: zodResolver(formShema),
    defaultValues: {
      razaoSocial: "",
      cnpj: "",
      email: "",
      telefone: "",
      empresaDescricao: "",
      responsavelNomeCompleto: "",
      responsavelSetor: "",
      responsavelCargo: "",
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
            <span class="pr-2 text-xs font-bold">Dados da empresa</span>
            <hr class="flex-grow" />
          </div>
          <FormField
            control={form.control}
            name="razaoSocial"
            render={({ field }) => {
              return (
                <div className="col-span-2 md:col-span-1">
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        id="razaoSocial"
                        label="Razão social"
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
            name="cnpj"
            render={({ field }) => {
              return (
                <div className="col-span-2 md:col-span-1">
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput {...field} id="cnpj" label="CNPJ" />
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
          <FormField
            control={form.control}
            name="empresaDescricao"
            render={({ field }) => {
              return (
                <div className="col-span-2">
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        id="empresaDescricao"
                        label="Breve descrição sobre a empresa"
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
            name="responsavelSetor"
            render={({ field }) => {
              return (
                <div className="col-span-2 md:col-span-1">
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        id="responsavelSetor"
                        label="Setor"
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
            name="responsavelCargo"
            render={({ field }) => {
              return (
                <div className="col-span-2 md:col-span-1">
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        {...field}
                        id="responsavelCargo"
                        label="Cargo"
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