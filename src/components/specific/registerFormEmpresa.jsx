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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";

import { Building2, Mail, Info, MoveRight } from "lucide-react";
import { redirect } from "react-router-dom";

const validarCnpj = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let add = 0;
  let pos = length - 7;
  for (let i = length; i >= 1; i--) {
    add += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = add % 11 < 2 ? 0 : 11 - (add % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length += 1;
  numbers = cnpj.substring(0, length);
  add = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    add += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = add % 11 < 2 ? 0 : 11 - (add % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};

const formShema = z.object({
  razaoSocial: z.string().min(1, { message: "Razão social é obrigatória" }),
  cnpj: z
    .string()
    .min(14, { message: "CNPJ precisa ter no mínimo 14 caracteres" })
    .refine((cnpj) => validarCnpj(cnpj), { message: "CNPJ inválido" }),
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
  responsavelNomeCOmpleto: z
    .string()
    .min(1, { message: "Nome completo é obrigatório" }),
  responsavelSetor: z.string().min(1, { message: "Setor é obrigatório" }),
  responsavelCargo: z
    .string()
    .min(1, { message: "Cargo completo é obrigatório" }),
});

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(formShema),
    defaultValues: {
      razaoSocial: "",
      cnpj: "",
      email: "",
      telefone: "",
      empresaDescricao: "",
      responsavelNomeCOmpleto: "",
      responsavelSetor: "",
      responsavelCargo: "",
    },
  });

  const handleSubmit = (data) => {
    console.log(data);
    //redirect("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-3">
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
            className="sm:col-span-2 md:col-span-1"
            render={({ field }) => {
              return (
                <div className="col-span-2 md:col-span-1">
                  <FormItem>
                    <FormControl>
                    <FloatingLabelInput
                        {...field}
                        id="cnpj"
                        label="CNPJ"
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

export default LoginForm;
