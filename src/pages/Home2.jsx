import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Menu,
  X,
  Building2,
  GraduationCap,
  Users,
  Lightbulb,
  Rocket,
  BarChart3,
  Microscope,
} from "lucide-react";
import { LogoCarousel } from "@/components/LogoCarousel";

export function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--azul-agregar)" }}
            >
              gate2way
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <span className="text-sm font-medium hover:text-primary cursor-pointer">
              Início
            </span>
            <span className="text-sm font-medium hover:text-primary cursor-pointer">
              Benefícios
            </span>
            <span className="text-sm font-medium hover:text-primary cursor-pointer">
              Métricas
            </span>
            <span className="text-sm font-medium hover:text-primary cursor-pointer">
              Impulsos
            </span>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex">
              Entrar
            </Button>
            <Button
              className="hidden md:flex text-white"
              style={{
                backgroundColor: "var(--azul-agregar)",
                "&:hover": {
                  backgroundColor: "var(--azul-agregar-hover)",
                },
              }}
            >
              Cadastrar
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between border-b py-4 text-sm font-medium cursor-pointer">
              Início <ChevronRight className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between border-b py-4 text-sm font-medium cursor-pointer">
              Benefícios <ChevronRight className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between border-b py-4 text-sm font-medium cursor-pointer">
              Métricas <ChevronRight className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between border-b py-4 text-sm font-medium cursor-pointer">
              Impulsos <ChevronRight className="h-4 w-4" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="outline" className="w-full">
                Entrar
              </Button>
              <Button
                className="w-full text-white"
                style={{
                  backgroundColor: "var(--azul-agregar)",
                }}
              >
                Cadastrar
              </Button>
            </div>
          </nav>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section
          style={{
            background: `linear-gradient(to bottom, var(--azul-agregar), var(--azul-agregar-hover))`,
          }}
          className="text-white py-20"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                  Ideias que transformam, parcerias que evoluem.
                </h1>
                <p className="max-w-[700px] text-lg md:text-xl text-white/80">
                  Gate2Way conecta empresas e Institutos de Ciência e Tecnologia
                  (ICTs), unindo demandas do mercado a soluções criadas por
                  talentos em formação.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button
                    className="bg-white hover:bg-white/90"
                    style={{ color: "var(--azul-agregar)" }}
                  >
                    Sou uma Empresa
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white/10"
                  >
                    Sou um ICT
                  </Button>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="w-full max-w-md h-[300px] md:h-[400px] bg-white/10 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Rocket className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-white/80 text-sm">
                      Placeholder para animação
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Carousel - Auto-playing and infinite */}
        <section className="py-12 bg-gray-100">
          <LogoCarousel />
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              O que podemos fazer por você?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-white to-blue-50 shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Para a comunidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    O gate2way impulsiona a inovação, gerando soluções
                    tecnológicas para os desafios da sociedade. A colaboração
                    entre empresas e ICTs fomenta o desenvolvimento de talentos
                    e a criação de um ecossistema de inovação vibrante.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-indigo-50 shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle>Para empresas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Conecte-se com talentos e projetos inovadores, agilize o
                    desenvolvimento de novos produtos e serviços, e fortaleça
                    sua marca como uma empresa comprometida com a inovação.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-teal-50 shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle>Para ICTs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Ofereça aos seus alunos a oportunidade de aplicar seus
                    conhecimentos em projetos reais, promovendo a pesquisa e o
                    desenvolvimento tecnológico e fortalecendo a relação entre
                    academia e mercado.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-16 bg-indigo-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nossas Métricas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="overflow-hidden bg-white shadow-lg">
                <div
                  className="h-2"
                  style={{
                    background: `linear-gradient(to right, var(--azul-agregar), #3B82F6)`,
                  }}
                ></div>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Rocket className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>Technology Readiness Level (TRL)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    O TRL é uma métrica desenvolvida pela NASA que avalia o
                    nível de maturidade de uma tecnologia em uma escala de 1 a
                    9, desde os princípios básicos até a operação comprovada.
                    Esta metodologia nos permite identificar precisamente em
                    qual estágio de desenvolvimento cada projeto se encontra.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden bg-white shadow-lg">
                <div
                  className="h-2"
                  style={{
                    background: `linear-gradient(to right, #8B5CF6, var(--azul-agregar))`,
                  }}
                ></div>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle>Índice ACATECH</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    O modelo ACATECH, desenvolvido pela Academia Alemã de
                    Ciências e Engenharia, complementa o TRL focando na
                    maturidade industrial. Com quatro estágios principais, esta
                    métrica nos ajuda a avaliar a preparação para manufatura e
                    implementação em escala industrial.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Academic Impulses Section */}
        <section className="py-16 bg-gradient-to-br from-white to-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Impulsos Acadêmicos</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                O Gate2Way incentiva as empresas parceiras a oferecerem impulsos
                acadêmicos para potencializar o desenvolvimento de projetos
                inovadores.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-t-4 border-t-blue-500 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <Microscope className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Infraestrutura</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Acesso a laboratórios e espaços de pesquisa para
                    desenvolvimento de projetos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-amber-500 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                    <Lightbulb className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl">Bolsa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Suporte financeiro para desenvolvimento de projetos
                    inovadores.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-green-500 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <Building2 className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Estágio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Oportunidades em empresas parceiras para aplicação prática
                    de conhecimentos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-purple-500 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Personalizado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Impulsos específicos cadastrados por empresas de acordo com
                    necessidades.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-16 text-white"
          style={{
            background: `linear-gradient(to right, var(--azul-agregar), var(--azul-agregar-hover))`,
          }}
        >
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para transformar ideias em realidade?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/80">
              Junte-se ao Gate2Way e faça parte de um ecossistema de inovação
              que conecta empresas e institutos de ciência e tecnologia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-white hover:bg-white/90"
                style={{ color: "var(--azul-agregar)" }}
              >
                Cadastre sua Empresa
              </Button>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                Cadastre seu ICT
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="text-white py-12"
        style={{ backgroundColor: "var(--azul-agregar-hover)" }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">gate2way</h3>
              <p className="text-white/70">
                Conectando empresas e ICTs para desenvolver projetos inovadores.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-white/70 hover:text-white cursor-pointer">
                    Início
                  </span>
                </li>
                <li>
                  <span className="text-white/70 hover:text-white cursor-pointer">
                    Benefícios
                  </span>
                </li>
                <li>
                  <span className="text-white/70 hover:text-white cursor-pointer">
                    Métricas
                  </span>
                </li>
                <li>
                  <span className="text-white/70 hover:text-white cursor-pointer">
                    Impulsos
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-white/70 hover:text-white cursor-pointer">
                    Blog
                  </span>
                </li>
                <li>
                  <span className="text-white/70 hover:text-white cursor-pointer">
                    FAQ
                  </span>
                </li>
                <li>
                  <span className="text-white/70 hover:text-white cursor-pointer">
                    Suporte
                  </span>
                </li>
                <li>
                  <span className="text-white/70 hover:text-white cursor-pointer">
                    Contato
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2">
                <li className="text-white/70">contato@gate2way.com</li>
                <li className="text-white/70">+55 (00) 0000-0000</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>
              © {new Date().getFullYear()} Gate2Way. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
