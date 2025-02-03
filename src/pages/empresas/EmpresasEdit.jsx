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
import { ArrowLeftCircle, CheckCircleIcon, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "@/hooks/use-toast";
import { validarCnpj } from "@/lib/utils";
import { withMask } from "use-mask-input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/axios.config";

const empresaFormSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome não deve exceder 100 caracteres"),
  razao_social: z
    .string()
    .min(1, "Razão social é obrigatória")
    .max(100, "Razão social não deve exceder 100 caracteres"),
  cnpj: z
    .string()
    .min(14, "CNPJ inválido")
    .max(14, "CNPJ inválido")
    .refine((cnpj) => {
      if (/^(\d)\1+$/.test(cnpj)) return false;
      return validarCnpj(cnpj);
    }, "CNPJ inválido"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .max(100, "Email não deve exceder 100 caracteres")
    .email("Email inválido"),
  endereco: z
    .string()
    .min(1, "Endereço é obrigatório")
    .max(100, "Endereço não deve exceder 100 caracteres"),
  area: z
    .string()
    .min(1, "Área de atuação é obrigatória")
    .max(45, "Área de atuação nao deve exceder 45 caracteres"),
  telefone: z
    .string()
    .min(12, "Telefone inválido")
    .max(12, "Telefone inválido")
    .regex(/^[1-9][0-9]{11}$/, "Telefone inválido"),
  site: z
    .string()
    .min(1, "Site é obrigatório")
    .max(100, "Site não deve exceder 100 caracteres"),
  foto_perfil: z
    .instanceof(FileList)
    .nullable()
    .refine(
      (files) => files && files.length > 0,
      "Foto de perfil é obrigatória"
    )
    .refine((files) => {
      if (!files || files.length === 0) return false;
      const allowedExtensions = ["jpg", "jpeg", "png"];
      return allowedExtensions.includes(
        files[0].name.split(".").pop().toLowerCase()
      );
    }, "Apenas arquivos JPG, JPEG e PNG são permitidos"),
});

export const EmpresasEdit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(empresaFormSchema),
    defaultValues: {
      nome: "",
      razao_social: "",
      cnpj: "",
      email: "",
      endereco: "",
      area: "",
      telefone: "",
      site: "",
      foto_perfil: null,
    },
  });

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await api.get(`/empresas/${id}`);
        const empresa = response.data;

        if (!empresa) {
          toast({
            title: "Erro ao carregar empresa",
            description: "Empresa não encontrada",
            variant: "destructive",
          });
          navigate("/empresas");
          return;
        }

        form.reset({
          nome: empresa.nome,
          razao_social: empresa.razao_social,
          cnpj: empresa.cnpj,
          email: empresa.email,
          endereco: empresa.endereco,
          area: empresa.area,
          telefone: empresa.telefone,
          site: empresa.site,
          foto_perfil: null,
        });
      } catch (error) {
        toast({
          title: "Erro ao carregar empresa",
          description: "Não foi possível carregar os dados do empresa",
          variant: "destructive",
        });
        navigate("/empresas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmpresa();
  }, [id, navigate, toast, form]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("razao_social", data.razao_social);
      formData.append("cnpj", data.cnpj);
      formData.append("email", data.email);
      formData.append("endereco", data.endereco);
      formData.append("area", data.area);
      formData.append("telefone", data.telefone);
      formData.append("site", data.site);

      if (data.foto_perfil && data.foto_perfil.length > 0) {
        formData.append("foto_perfil", data.foto_perfil[0]);
      }

      const response = await api.put(`/empresas/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Empresa criada com sucesso.",
        variant: "success",
      });

      navigate("/empresas");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Erro ao criar empresa. Tente novamente.";

      toast({
        title: "Erro ao criar a empresa",
        description: errorMessage,
        variant: "destructive",
      });

      if (error.response?.status === 403) {
        form.setError("root", {
          type: "manual",
          message: "Você não tem permissão para editar uma empresa no sistema.",
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
    <MainWrapper title="Editar empresa">
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
              <Link to="/empresas">
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
            Carregando empresa...
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full grid grid-cols-2 gap-4"
            >
              {form.formState.errors.root && (
                <div className="col-span-2 text-red-500 text-sm">
                  {form.formState.errors.root.message}
                </div>
              )}

              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type="text" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="razao_social"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Razão social</FormLabel>
                    <FormControl>
                      <Input type="text" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl ref={withMask("99.999.999/9999-99")}>
                      <Input
                        type="text"
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
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input type="text" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Área de atuação</FormLabel>
                    <FormControl>
                      <Input type="text" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
                name="site"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Site</FormLabel>
                    <FormControl>
                      <Input type="url" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="foto_perfil"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Foto de Perfil</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        disabled={isSubmitting}
                        onChange={(e) => onChange(e.target.files)}
                        {...fieldProps}
                      />
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
