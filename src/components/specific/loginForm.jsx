import { useContext } from "react";
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

import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

import { AuthContext } from "@/contexts/authContext";

const formShema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  senha: z.string().min(1, { message: "Senha é obrigatória" }),
});

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(formShema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const { login } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const handleSubmit = (data) => {
    console.log(data);
    login(data);
    navigate("/demandas"); 
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="text"
                    icon={<Mail size={20} className="absolute mx-3" />}
                    className="pl-10 placeholder:pl-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Senha"
                    type="password"
                    icon={<Lock size={20} className="absolute mx-3" />}
                    className="pl-10 placeholder:pl-0"
                    {...field}
                  />
                </FormControl>
                <a
                  href="/"
                  className="text-xs text-muted-foreground text-medium"
                >
                  Esqueceu a senha?
                </a>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          type="submit"
          className="bg-[var(--azul-agregar)] hover:bg-[var(--azul-agregar-hover)]"
        >
          Confirmar
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
