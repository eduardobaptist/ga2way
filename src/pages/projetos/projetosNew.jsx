import { useState } from "react";
import { Link } from "react-router-dom";
import MainWrapper from "@/components/mainWrapper";
import ProjectCanvas from "@/components/specific/projectCanvas";
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

const ProjetosNew = () => {
  const [layout, setLayout] = useState("infosGerais");

  return (
    <MainWrapper title="Novo projeto">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <AlertDialog>
            <AlertDialogTrigger>
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
                  Os dados inseridos ou atualizados serão perdidos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>
                  <Link to="/private/projetos">Continuar</Link>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Tabs
            value={layout}
            defaultValue="grid"
            className="w-max h-max"
            onValueChange={setLayout}
          >
            <TabsList
              className="grid w-full grid-cols-2"
              onValueChange={setLayout}
            >
              <TabsTrigger value="infosGerais">Informações gerais</TabsTrigger>
              <TabsTrigger value="projectCanvas">Project canvas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Button
          className="bg-green-500 text-white font-bold hover:text-white hover:bg-green-600"
          variant="outline"
        >
          <CheckCircleIcon className="mr-2" size="20" />
          Salvar
        </Button>
      </div>
      {layout === "infosGerais" ? "a" : <ProjectCanvas />}
    </MainWrapper>
  );
};

export default ProjetosNew;