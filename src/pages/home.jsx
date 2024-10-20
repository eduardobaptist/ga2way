import gatewayLogo from "../assets/img/gateway_logo_branco.png";
import { useState } from "react";
import highFive from "../assets/animations/high-five.json";
import LogoCarousel from "@/components/logoCarousel";
import { Player } from "@lottiefiles/react-lottie-player";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Link } from "react-router-dom";
import LoginForm from "@/components/specific/loginForm";
import RegisterFormEmpresa from "@/components/specific/registerFormEmpresa";
import RegisterFormIct from "@/components/specific/registerFormIct";
const Home = () => {
  const [isLoginDialogOpen, setLoginDialog] = useState(false);
  const [isRegisterDialogOpen, setRegisterDialog] = useState(false);

  const openLoginDialog = () => {
    setLoginDialog(true);
    setRegisterDialog(false);
  };

  const openRegisterDialog = () => {
    setLoginDialog(false);
    setRegisterDialog(true);
  };

  const closeRegisterDialog = () => {
    setRegisterDialog(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-center bg-[var(--azul-agregar)] shadow-lg">
        <nav className="mx-auto px-4 sm:px-6 md:px-8 max-w-[1200px] w-full flex flex-wrap items-center justify-between py-1">
          <Link to="/">
            <img src={gatewayLogo} alt="" />
          </Link>
          <div>
            <Button
              variant="ghost"
              className="text-white text-lg"
              onClick={openLoginDialog}
            >
              Entrar
            </Button>
            <Button
              variant="outline"
              className="text-white text-lg"
              onClick={openRegisterDialog}
            >
              Começar
            </Button>
            <Dialog open={isLoginDialogOpen} onOpenChange={setLoginDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Entrar</DialogTitle>
                  <DialogDescription>Insira suas credenciais</DialogDescription>
                </DialogHeader>
                {/* Form do login */}
                <LoginForm />
                <div className="flex items-center justify-center">
                  <span className="font-semibold text-sm">
                    Não tem uma conta?
                  </span>
                  <Button
                    variant="ghost"
                    className="text-sm font-semibold text-[var(--azul-agregar)] p-0 mx-1"
                    onClick={openRegisterDialog}
                  >
                    Cadastre-se
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog
              open={isRegisterDialogOpen}
              onOpenChange={setRegisterDialog}
            >
              <DialogContent className=" overflow-y-auto max-h-screen sm:max-w-md md:max-w-xl">
                <DialogHeader>
                  <DialogTitle>Primeiros passos</DialogTitle>
                  <DialogDescription>
                    Selecione a modalidade do cadastro e insira os dados
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="empresa" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-5">
                    <TabsTrigger value="empresa">Empresa</TabsTrigger>
                    <TabsTrigger value="ict">Instituição</TabsTrigger>
                  </TabsList>
                  <TabsContent value="empresa">
                    {/* Form do registro de empresa */}
                    <RegisterFormEmpresa closeDialog={closeRegisterDialog} />
                  </TabsContent>
                  <TabsContent value="ict">
                    {/* Form do registro de ICT */}
                    <RegisterFormIct closeDialog={closeRegisterDialog}/>
                  </TabsContent>
                </Tabs>
                <div className="flex items-center justify-center">
                  <span className="font-semibold text-sm">
                    Já tem uma conta?
                  </span>
                  <Button
                    variant="ghost"
                    className="text-sm font-semibold text-[var(--azul-agregar)] p-0 mx-1"
                    onClick={openLoginDialog}
                  >
                    Entrar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-[1200px] w-full">
          <div className="grid grid-cols-3 mt-15 mb-5">
            <div className="flex items-center justify-start col-span-3 md:col-span-2 order-2 md:order-1">
              <h1 className="mb-4 text-center md:text-start text-4xl font-bold leading-none tracking-tighter text-black md:text-5xl lg:text-6xl dark:text-white">
                ideias que transformam, parcerias que evoluem.
              </h1>
            </div>
            <div className="col-span-3 md:col-span-1 items-center order-1 md:order-2">
              <Player
                src={highFive}
                className="w-full h-full"
                autoplay
                loop
              ></Player>
            </div>
          </div>
        </div>
        <LogoCarousel />
        <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-[1200px] w-full mt-3">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>O que é o ga2way?</AccordionTrigger>
              <AccordionContent>
                É um ferramenta de integração entre redes de inovação: empresas
                e instituições de ensino.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <footer className="mx-auto px-4 sm:px-6 md:px-8 max-w-[1200px] w-full">
        teste
      </footer>
    </div>
  );
};

export default Home;
