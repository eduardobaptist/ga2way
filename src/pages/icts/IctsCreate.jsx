import { useState } from "react";
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
import { ArrowLeftCircle, CheckCircleIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import InputMask from "react-input-mask";
import api from "@/axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RequiredFieldSpan } from "@/components/RequiredFieldSpan";
import { UFComboBox } from "@/components/UFComboBox";
import { CidadeCombobox } from "@/components/CidadeComboBox";

const getPhoneMask = (value) => {
  const digits = value.replace(/\D/g, "");
  if (
    digits.length === 11 ||
    (digits.length >= 3 && digits.charAt(2) === "9")
  ) {
    return "(99) 99999-9999"; // celular
  }
  return "(99) 9999-9999"; // telefone fixo
};

const ictFormSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome não deve exceder 100 caracteres"),
  razao_social: z.string().optional(),
  cnpj: z.string().optional(),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .max(100, "Email não deve exceder 100 caracteres")
    .email("Email inválido"),
  endereco: z.string().optional(),
  uf: z.string().max(2).optional(),
  cidade: z.string().max(100).optional(),
  telefone: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;
      const digits = value.replace(/\D/g, "");
      if (digits.length === 0) return true;
      if (digits.length === 11) return true;
      if (digits.length === 10 && digits.charAt(2) !== "9") return true;
      return false;
    }, "Telefone inválido. Use 10 dígitos para fixo (sem 9) ou 11 para celular"),
  site: z.string().max(100, "Site não deve exceder 100 caracteres"),
  foto_perfil: z
    .instanceof(FileList)
    .nullable()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      const allowedExtensions = ["jpg", "jpeg", "png"];
      return allowedExtensions.includes(
        files[0].name.split(".").pop().toLowerCase()
      );
    }, "Apenas arquivos JPG, JPEG e PNG são permitidos"),
});

export const IctsCreate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneMask, setPhoneMask] = useState("(99) 9999-9999");

  const form = useForm({
    resolver: zodResolver(ictFormSchema),
    defaultValues: {
      nome: "",
      razao_social: "",
      cnpj: "",
      email: "",
      endereco: "",
      uf: "",
      cidade: "",
      telefone: "",
      site: "",
      foto_perfil: null,
    },
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("razao_social", data.razao_social);
      formData.append("cnpj", data.cnpj);
      formData.append("email", data.email);
      formData.append("endereco", data.endereco);
      formData.append("uf", data.uf);
      formData.append("cidade", data.cidade);
      formData.append("telefone", data.telefone.replace(/\D/g, ""));
      formData.append("site", data.site);

      if (data.foto_perfil && data.foto_perfil.length > 0) {
        formData.append("foto_perfil", data.foto_perfil[0]);
      }

      const response = await api.post("/icts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "ICT criada com sucesso.",
        variant: "success",
      });

      navigate("/icts");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro ao criar ICT. Tente novamente.";

      toast({
        title: "Erro ao criar a ICT",
        description: errorMessage,
        variant: "destructive",
      });

      if (error.response?.status === 403) {
        form.setError("root", {
          type: "manual",
          message: "Você não tem permissão para criar uma ICT no sistema.",
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
    <MainWrapper title="Nova ICT">
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
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Link to="/icts">
                <AlertDialogAction className="w-full md:w-fit">
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
                  <FormLabel>
                    Nome <RequiredFieldSpan />
                  </FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isSubmitting} {...field} />
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
                  <FormLabel>
                    Email <RequiredFieldSpan />
                  </FormLabel>
                  <FormControl>
                    <Input type="email" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <UFComboBox form={form} isSubmitting={isSubmitting} />
            <CidadeCombobox form={form} isSubmitting={isSubmitting} />

            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Telefone/celular</FormLabel>
                  <FormControl>
                    <InputMask
                      mask={phoneMask}
                      value={field.value}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "");
                        const newMask = getPhoneMask(digits);

                        if (newMask !== phoneMask) {
                          setPhoneMask(newMask);
                        }

                        field.onChange(e.target.value);
                      }}
                      disabled={isSubmitting}
                    >
                      {(inputProps) => (
                        <Input
                          {...inputProps}
                          type="tel"
                          placeholder="(99) 9999-9999"
                        />
                      )}
                    </InputMask>
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
      </div>
    </MainWrapper>
  );
};
