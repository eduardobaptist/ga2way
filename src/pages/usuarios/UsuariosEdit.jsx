import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { ArrowLeftCircle, CheckCircleIcon, Loader2, EyeOff, Eye } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "@/hooks/use-toast";
import { withMask } from "use-mask-input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/axios.config";

const usuarioFormSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(255, "Nome não deve exceder 255 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .max(255, "Email não deve exceder 255 caracteres")
    .email("Email inválido"),
  senha: z
    .string()
    .min(1, "Insira a senha do usuário")
    .max(20, "Senha não deve exceder os 20 caracteres"),
  endereco: z
    .string()
    .min(1, "Endereço é obrigatório")
    .max(100, "Endereço não deve exceder 100 caracteres"),
  telefone: z
    .string()
    .min(12, "Telefone inválido")
    .max(12, "Telefone inválido")
    .regex(/^[1-9][0-9]{11}$/, "Telefone inválido"),
});

export const UsuariosEdit = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usuarioState, setUsuarioState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(usuarioFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      endereco: "",
      telefone: "",
    },
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get(`/usuarios/${id}`);
        const usuario = response.data;

        if (!usuario) {
          toast({
            title: "Erro ao carregar usuário",
            description: "Usuário não encontrado",
            variant: "destructive",
          });
          navigate("/usuários");
          return;
        }

        setUsuarioState(usuario);

        form.reset({
          nome: usuario.nome,
          email: usuario.email,
          endereco: usuario.endereco,
          telefone: usuario.telefone,
        });
      } catch (error) {
        toast({
          title: "Erro ao carregar usuário",
          description: "Não foi possível carregar os dados do usuário",
          variant: "destructive",
        });
        navigate("/usuarios");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsuario();
  }, [id, navigate, toast, form]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await api.put(`/usuarios/${id}`, {
        ...data,
        ict_id: usuarioState.ict_id,
        empresa_id: usuarioState.empresa_id,
        tipo: usuarioState.tipo,
      });

      toast({
        title: "Usuário atualizdo com sucesso.",
        variant: "success",
      });

      navigate("/usuarios");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Erro ao atualizar usuário. Tente novamente.";

      toast({
        title: errorMessage,
        variant: "destructive",
      });

      if (error.response?.status === 403) {
        form.setError("root", {
          type: "manual",
          message: "Você não tem permissão para atualizar usuários.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = () => {
    form.handleSubmit(handleSubmit)();
  };

  return (
    <MainWrapper title="Editar usuário">
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
              <Link to="/usuarios">
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
        {isLoading ? (
          <div className="flex mt-5 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Carregando usuário...
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full grid grid-cols-2 gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel>E-mail</FormLabel>
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
                name="senha"
                render={({ field }) => (
                  <FormItem className="relative col-span-2 md:col-span-1">
                    <FormLabel>Senha</FormLabel>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => {
                  return (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel>Nome</FormLabel>
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
                name="telefone"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl ref={withMask("+99 (99) 9999-9999")}>
                      <Input
                        type="tel"
                        disabled={isSubmitting}
                        {...field}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, "");
                          field.onChange(rawValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input type="text" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
      </div>
    </MainWrapper>
  );
};
