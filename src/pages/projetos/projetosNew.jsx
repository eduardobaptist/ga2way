import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import MainWrapper from "@/components/mainWrapper";
import ProjectCanvas from "@/components/specific/projectCanvas";
import ProjectForm from "@/components/specific/projectForm";
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
import { ArrowLeftCircle, CheckCircleIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ProjetosNew = () => {
  const [layout, setLayout] = useState("infosGerais");
  const projectFormRef = useRef(null);
  const isMobile = useIsMobile();
  const handleSave = () => {
    if (projectFormRef.current) {
      projectFormRef.current.requestSubmit();
    }
  };

  const onSubmit = () => {
    console.log('Form submitted successfully');
  };
  
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
                  <Link to="/rotas/programas/projetos">
                    <AlertDialogAction className="w-full md:w-fit">Continuar</AlertDialogAction>
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
                <TabsTrigger value="infosGerais">Informações gerais</TabsTrigger>
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
                  <Link to="/rotas/programas/projetos">
                    <AlertDialogAction className="w-full md:w-fit">Continuar</AlertDialogAction>
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
                <TabsTrigger value="infosGerais">Informações gerais</TabsTrigger>
                <TabsTrigger value="projectCanvas">Project canvas</TabsTrigger>
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
          <ProjectForm ref={projectFormRef} onSubmit={onSubmit} />
        </div>
        <div style={{ display: layout === "projectCanvas" ? "block" : "none" }}>
          <ProjectCanvas />
        </div>
      </div>
    </MainWrapper>
  );
};

export default ProjetosNew;
