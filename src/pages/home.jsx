import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogoCarousel } from "@/components/LogoCarousel";
import { HomeBadges } from "@/components/HomeBadges";
import { HomeNossasMetricas } from "@/components/HomeNossasMetricas";
import { HomeIncentivos } from "@/components/HomeIncentivos";
import { LoginForm } from "@/components/LoginForm";
import { RegisterFormEmpresa } from "@/components/RegisterFormEmpresa";
import { RegisterFormIct } from "@/components/RegisterFormIct";
import gatewayLogo from "/public/img/gateway_logo_branco.png";

import highFive from "/public/animations/high-five.json";
import rocket from "/public/animations/rocket.json";

export const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-[var(--azul-agregar)] shadow-lg">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full flex items-center justify-between py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <img src={gatewayLogo} alt="Gateway Logo" className="h-10" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-x-4"
          >
            <Button
              variant="ghost"
              className="text-white text-lg hover:bg-white/10 transition-colors"
              onClick={openLoginDialog}
            >
              Entrar
            </Button>
            <Button
              variant="outline"
              className="text-white text-lg border-white hover:bg-white hover:text-[var(--azul-agregar)] transition-colors"
              onClick={openRegisterDialog}
            >
              Começar
            </Button>
          </motion.div>
        </nav>
      </header>

      <main className="flex-grow">
        <section>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="md:col-span-2 text-center md:text-left order-2 md:order-1"
                data-aos="fade-right"
              >
                <h1 className="text-4xl font-bold leading-tight tracking-tighter text-black md:text-5xl lg:text-6xl dark:text-white mb-6">
                  Ideias que transformam, parcerias que evoluem.
                </h1>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-700 dark:text-gray-300">
                  Gate2Way conecta empresas e instituições, unindo demandas do
                  mercado a soluções criadas por talentos em formação.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="md:col-span-1 order-1 md:order-2"
                data-aos="fade-left"
              >
                <Player
                  src={highFive}
                  className="w-full h-[400px]"
                  autoplay
                  loop
                />
              </motion.div>
            </div>
          </div>
        </section>

        <div data-aos="fade-up">
          <LogoCarousel />
        </div>

        <section className="py-20 bg-gradient-to-r from-sky-500 to-indigo-500">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2
              className="text-3xl md:text-4xl font-semibold text-white text-center mb-12"
              data-aos="fade-up"
            >
              O que podemos fazer por você?
            </h2>
            <div data-aos="fade-up" data-aos-delay="200">
              <HomeBadges />
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 overflow-hidden">
          <div className="container mx-auto px-4">
            <h2
              className="text-4xl font-bold text-center text-white mb-8"
              data-aos="fade-up"
            >
              Nossas métricas
            </h2>

            <div
              className="max-w-3xl mx-auto text-center mb-16"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="text-white/90 text-lg mb-6">
                Utilizamos duas métricas complementares para avaliar e
                acompanhar o desenvolvimento dos nossos projetos: TRL
                (Technology Readiness Level) e ACATECH, garantindo uma visão
                completa do progresso tecnológico e industrial.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <div
                className="space-y-8 flex flex-col"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Technology Readiness Level (TRL)
                  </h3>
                  <p className="text-white/80">
                    O TRL é uma métrica desenvolvida pela NASA que avalia o
                    nível de maturidade de uma tecnologia em uma escala de 1 a
                    9, desde os princípios básicos até a operação comprovada.
                    Esta metodologia nos permite identificar precisamente em
                    qual estágio de desenvolvimento cada projeto se encontra.
                  </p>
                </div>
                <div className="flex justify-center overflow-x-auto max-w-full">
                  <div className="w-full">
                    <HomeNossasMetricas trlOnly />
                  </div>
                </div>
              </div>

              <div
                className="space-y-8 flex flex-col"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Índice ACATECH
                  </h3>
                  <p className="text-white/80">
                    O modelo ACATECH, desenvolvido pela Academia Alemã de
                    Ciências e Engenharia, complementa o TRL focando na
                    maturidade industrial. Com quatro estágios principais, esta
                    métrica nos ajuda a avaliar a preparação para manufatura e
                    implementação em escala industrial.
                  </p>
                </div>
                <div className="flex justify-center overflow-x-auto max-w-full">
                  <div className="w-full">
                    <HomeNossasMetricas acatechOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-l from-blue-900 via-gray-900 to-black">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2
              className="text-3xl md:text-4xl font-semibold text-white text-center mb-12"
              data-aos="fade-up"
            >
              Te ajudamos a chegar mais longe
            </h2>
            <div
              className="max-w-3xl mx-auto text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="text-white/90 text-lg">
                O Gate2Way incentiva que as empresas parceiras incluam em seus
                projetos um impulso acadêmico para a permanência e valorização
                do talento em formação
              </p>
            </div>
            <div
              className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Player
                src={rocket}
                className="w-full lg:w-2/3 h-[700px]"
                autoplay
                loop
              />
              <HomeIncentivos />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © 2024 Gate2Way. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <Dialog open={isLoginDialogOpen} onOpenChange={setLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Entrar</DialogTitle>
            <DialogDescription>Insira suas credenciais</DialogDescription>
          </DialogHeader>
          <LoginForm />
          <div className="flex items-center justify-center mt-4">
            <span className="font-semibold text-sm">Não tem uma conta?</span>
            <Button
              variant="link"
              className="text-sm font-semibold text-[var(--azul-agregar)] px-2"
              onClick={openRegisterDialog}
            >
              Cadastre-se
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isRegisterDialogOpen} onOpenChange={setRegisterDialog}>
        <DialogContent className="sm:max-w-md md:max-w-xl overflow-y-auto max-h-[90vh]">
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
              <RegisterFormEmpresa closeDialog={closeRegisterDialog} />
            </TabsContent>
            <TabsContent value="ict">
              <RegisterFormIct closeDialog={closeRegisterDialog} />
            </TabsContent>
          </Tabs>
          <div className="flex items-center justify-center mt-4">
            <span className="font-semibold text-sm">Já tem uma conta?</span>
            <Button
              variant="link"
              className="text-sm font-semibold text-[var(--azul-agregar)] px-2"
              onClick={openLoginDialog}
            >
              Entrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
