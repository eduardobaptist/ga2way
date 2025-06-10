import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { MainWrapper } from "@/components/MainWrapper";
import { ProjetosProjectCanvas } from "@/pages/projetos/ProjetosProjectCanvas";
import { ProjetosForm } from "@/pages/projetos/ProjetosForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, CheckCircleIcon, Library, PanelsTopLeftIcon, Presentation } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import api from "@/axios.config";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const ProjetosCreate = () => {
  const [layout, setLayout] = useState("infosGerais");
  const projectFormRef = useRef(null);
  const isMobile = useIsMobile();
  const [canvasData, setCanvasData] = useState(null);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSave = useCallback(() => {
    if (projectFormRef.current) {
      projectFormRef.current.requestSubmit();
    }
  }, []);

  const onSubmit = useCallback(
    async (formData) => {
      formData.append(
        "justificativas",
        canvasData["justificativas"]?.textarea_value
      );
      formData.append("objsmart", canvasData["objsmart"]?.textarea_value);
      formData.append("beneficios", canvasData["beneficios"]?.textarea_value);
      formData.append("produto", canvasData["produto"]?.textarea_value);
      formData.append("requisitos", canvasData["requisitos"]?.textarea_value);
      formData.append(
        "stakeholders",
        canvasData["stakeholders"]?.textarea_value
      );
      formData.append("equipe", canvasData["equipe"]?.textarea_value);
      formData.append("premissas", canvasData["premissas"]?.textarea_value);
      formData.append(
        "grupo_de_entrega",
        canvasData["grupo_de_entrega"]?.textarea_value
      );
      formData.append("restricoes", canvasData["restricoes"]?.textarea_value);
      formData.append("riscos", canvasData["riscos"]?.textarea_value);
      formData.append(
        "linha_do_tempo",
        canvasData["linha_do_tempo"]?.textarea_value
      );
      formData.append("custos", canvasData["custos"]?.textarea_value);
      formData.append("estilo", JSON.stringify(canvasData));

      console.log(`ProjetosCreate data: ${formData}`);

      const response = await api.post("/projetos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Projeto criado com sucesso.",
        variant: "success",
      });

      navigate("/projetos");
    },
    [canvasData]
  );

  return (
    <MainWrapper title="Novo projeto">
      {isMobile ? (
        <div className="space-y-3">
          <div className="flex justify-between align-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-[var(--azul-agregar)] text-white hover:text-white hover:bg-[var(--azul-agregar-hover)]"
                  variant="outline"
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
                  <Link to="/projetos">
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
            >
              <CheckCircleIcon className="mr-2" size="20" />
              Salvar
            </Button>
          </div>
          <div>
            <Tabs
              value={layout}
              defaultValue="grid"
              className="w-full h-max"
              onValueChange={setLayout}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="infosGerais">
                  <Library /> Informações gerais
                </TabsTrigger>
                <TabsTrigger value="projectCanvas">Project canvas</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-[var(--azul-agregar)] text-white hover:text-white hover:bg-[var(--azul-agregar-hover)]"
                  variant="outline"
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
                  <Link to="/projetos">
                    <AlertDialogAction className="w-full md:w-fit">
                      Continuar
                    </AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Tabs
              value={layout}
              defaultValue="grid"
              className="w-max h-max"
              onValueChange={setLayout}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="infosGerais">
                  <Library size="20" className="mr-2" />
                  Informações gerais
                </TabsTrigger>
                <TabsTrigger value="projectCanvas"><PanelsTopLeftIcon size="20" className="mr-2" />Project canvas</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Button
            className="bg-green-500 text-white font-bold hover:text-white hover:bg-green-600"
            variant="outline"
            onClick={handleSave}
          >
            <CheckCircleIcon className="mr-2" size="20" />
            Salvar
          </Button>
        </div>
      )}
      <div className="mt-5">
        <div style={{ display: layout === "infosGerais" ? "block" : "none" }}>
          <ProjetosForm ref={projectFormRef} onSubmit={onSubmit} />
        </div>
        <div style={{ display: layout === "projectCanvas" ? "block" : "none" }}>
          <ProjetosProjectCanvas setCanvasData={setCanvasData} />
        </div>
      </div>
    </MainWrapper>
  );
};
