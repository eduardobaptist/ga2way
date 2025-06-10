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
import { ProjetoWizard } from "./wizard/ProjetoWizard";

export const ProjetosCreate = () => {

  return (
    <MainWrapper title="Novo projeto">
      <ProjetoWizard />
    </MainWrapper>
  );
};
