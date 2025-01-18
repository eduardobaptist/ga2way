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
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/axios.config";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";

const formShema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  senha: z.string().min(1, { message: "Senha é obrigatória" }),
});

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formShema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const navigate = useNavigate();
  const { authData, login } = useAuth();

  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post("/login", data);

      const authData = {
        usuario: response.data.usuario,
        token: response.data.token,
      };

      login(authData);

      navigate("/rotas/programas/projetos");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: error.response?.data?.message || error.message,
      });
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </>
          ) : (
            "Confirmar"
          )}
        </Button>
      </form>
    </Form>
  );
};
