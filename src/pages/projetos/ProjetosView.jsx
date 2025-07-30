import { MainWrapper } from "@/components/MainWrapper";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle, DownloadIcon, Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/Field";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { formatDatetime } from "@/lib/utils";
import api from "@/axios";
import { useAuth } from "@/contexts/AuthContext";

export const ProjetosView = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [projeto, setProjeto] = useState(null);
  const [tab, setTab] = useState("geral");
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const tabOptions = [
    { value: "geral", label: "Informações gerais" },
    ...(["admin", "empresa"].includes(user?.tipo)
      ? [
          { value: "propostas", label: "Propostas" },
          { value: "historico", label: "Histórico" },
        ]
      : []),
    { value: "canvas", label: "Project canvas" },
  ];

  const fetchProjeto = async () => {
    setIsLoading(true);

    try {
      const response = await api.get(`/projetos/${id}`);

      if (response?.data) {
        setProjeto(response?.data);
        console.log(response?.data);
      } else {
        throw new Error("Projeto não encontrado");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Erro ao carregar projeto.";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
      navigate("/projetos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const fileUrl = `${import.meta.env.VITE_API_URL}${projeto?.upload}`;
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${projeto.nome}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Erro ao baixar arquivo",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProjeto();
  }, []);

  const PropostaItem = ({ proposta, index }) => (
    <div 
      className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:border-gray-200"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Empresa" value={proposta.empresa?.nome || "Não informado"} />
        <Field label="Valor" value={proposta.valor ? `R$ ${proposta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "Não informado"} />
        <Field label="Data da proposta" value={formatDatetime(proposta.data_proposta)} />
        <Field label="Prazo de entrega" value={proposta.prazo_entrega ? `${proposta.prazo_entrega} dias` : "Não informado"} />
        {proposta.observacoes && (
          <div className="col-span-1 md:col-span-2">
            <Field label="Observações" value={proposta.observacoes} />
          </div>
        )}
        {proposta.anexo && (
          <div className="col-span-1 md:col-span-2">
            <Button
              onClick={() => window.open(`${import.meta.env.VITE_API_URL}${proposta.anexo}`, '_blank')}
              variant="outline"
              size="sm"
              className="transition-all duration-200 hover:scale-105 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <DownloadIcon className="mr-2" size="16" />
              Visualizar anexo
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <MainWrapper title={projeto?.nome}>
      <Tabs defaultValue="geral" value={tab} onValueChange={setTab}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
          <Link to="/projetos">
            <Button
              className="bg-[var(--azul-agregar)] text-white hover:text-white hover:bg-[var(--azul-agregar-hover)]"
              variant="outline"
            >
              <ArrowLeftCircle className="mr-2" size="20" />
              Voltar
            </Button>
          </Link>

          {isMobile ? (
            <div className="w-full sm:w-auto min-w-[250px]">
              <Select value={tab} onValueChange={setTab}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma seção" />
                </SelectTrigger>
                <SelectContent>
                  {tabOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <TabsList>
              {tabOptions.map((option) => (
                <TabsTrigger key={option.value} value={option.value}>
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          )}
        </div>

        {isLoading ? (
          <div className="flex mt-5 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Carregando projeto...
          </div>
        ) : (
          <>
            <TabsContent value="geral">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <Field label="Nome" value={projeto.nome} />
                <Field label="Descrição" value={projeto.descricao} />
                <Field
                  label="Programa do projeto"
                  value={projeto.Programa?.nome}
                />
                <Field
                  label="Data de início"
                  value={`${formatDatetime(projeto.data_inicio) || ""}`}
                />
                <Field
                  label="Data de término"
                  value={`${formatDatetime(projeto.data_fim) || ""}`}
                />
                <Field
                  label="Nível TRL"
                  value={`${projeto.tlr || "Não especificado"}`}
                />
                <Field
                  label="Nível ACATECH"
                  value={`${projeto.acatech || "Não especificado"}`}
                />
                <Field
                  label="Prioridade"
                  value={`${projeto.prioridade || "Não especificado"}`}
                />
                {projeto?.upload && (
                  <div>
                    <Button
                      onClick={handleDownload}
                      className="bg-[#7C3AED] text-white hover:bg-[#6D28D9] hover:text-white"
                      variant="outline"
                    >
                      <DownloadIcon className="mr-2" size="20" />
                      Baixar arquivo com detalhes
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* <TabsContent value="propostas">
              <div className="animate-in fade-in-50 duration-500">
                <div className="space-y-6">
                  <Accordion type="multiple" className="w-full space-y-4">
                    <AccordionItem 
                      value="pendentes" 
                      className="border border-amber-200/60 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-amber-300/70"
                    >
                      <AccordionTrigger className="px-6 py-5 hover:no-underline bg-gradient-to-br from-amber-50/80 via-yellow-50/60 to-orange-50/80 hover:from-amber-100/80 hover:via-yellow-100/70 hover:to-orange-100/80 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-sm">
                            <Clock className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-left">
                            <span className="font-semibold text-amber-800 text-lg">
                              Propostas Pendentes
                            </span>
                            <div className="text-sm text-amber-700/80 font-medium">
                              {propostasPendentes.length} {propostasPendentes.length === 1 ? 'proposta' : 'propostas'}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="pt-4">
                          {propostasPendentes.length === 0 ? (
                            <div className="text-center py-8">
                              <div className="p-3 bg-amber-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <Clock className="h-8 w-8 text-amber-400" />
                              </div>
                              <p className="text-gray-500 text-lg">Nenhuma proposta pendente</p>
                              <p className="text-gray-400 text-sm mt-2">As propostas aguardando análise aparecerão aqui</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {propostasPendentes.map((proposta, index) => (
                                <div 
                                  key={proposta.id} 
                                  className="animate-in slide-in-from-left duration-500"
                                  style={{ animationDelay: `${index * 100}ms` }}
                                >
                                  <PropostaItem proposta={proposta} index={index} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem 
                      value="aprovadas" 
                      className="border border-emerald-200/60 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-emerald-300/70"
                    >
                      <AccordionTrigger className="px-6 py-5 hover:no-underline bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-teal-50/80 hover:from-emerald-100/80 hover:via-green-100/70 hover:to-teal-100/80 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-sm">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-left">
                            <span className="font-semibold text-emerald-800 text-lg">
                              Propostas Aprovadas
                            </span>
                            <div className="text-sm text-emerald-700/80 font-medium">
                              {propostasAprovadas.length} {propostasAprovadas.length === 1 ? 'proposta' : 'propostas'}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="pt-4">
                          {propostasAprovadas.length === 0 ? (
                            <div className="text-center py-8">
                              <div className="p-3 bg-emerald-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-emerald-400" />
                              </div>
                              <p className="text-gray-500 text-lg">Nenhuma proposta aprovada ainda</p>
                              <p className="text-gray-400 text-sm mt-2">As propostas aprovadas aparecerão aqui</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {propostasAprovadas.map((proposta, index) => (
                                <div 
                                  key={proposta.id} 
                                  className="animate-in slide-in-from-left duration-500"
                                  style={{ animationDelay: `${index * 100}ms` }}
                                >
                                  <PropostaItem proposta={proposta} index={index} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem 
                      value="nao-aprovadas" 
                      className="border border-rose-200/60 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-rose-300/70"
                    >
                      <AccordionTrigger className="px-6 py-5 hover:no-underline bg-gradient-to-br from-rose-50/80 via-red-50/60 to-pink-50/80 hover:from-rose-100/80 hover:via-red-100/70 hover:to-pink-100/80 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-rose-500 to-red-600 rounded-full shadow-sm">
                            <XCircle className="h-5 w-5 text-white" />
                          </div>
                          <div className="text-left">
                            <span className="font-semibold text-rose-800 text-lg">
                              Propostas Não Aprovadas
                            </span>
                            <div className="text-sm text-rose-700/80 font-medium">
                              {propostasNaoAprovadas.length} {propostasNaoAprovadas.length === 1 ? 'proposta' : 'propostas'}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="pt-4">
                          {propostasNaoAprovadas.length === 0 ? (
                            <div className="text-center py-8">
                              <div className="p-3 bg-rose-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <XCircle className="h-8 w-8 text-rose-400" />
                              </div>
                              <p className="text-gray-500 text-lg">Nenhuma proposta rejeitada</p>
                              <p className="text-gray-400 text-sm mt-2">As propostas não aprovadas aparecerão aqui</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {propostasNaoAprovadas.map((proposta, index) => (
                                <div 
                                  key={proposta.id} 
                                  className="animate-in slide-in-from-left duration-500"
                                  style={{ animationDelay: `${index * 100}ms` }}
                                >
                                  <PropostaItem proposta={proposta} index={index} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </TabsContent> */}

            <TabsContent value="historico">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Histórico</h3>
                <p className="text-gray-600">
                  Conteúdo do histórico do projeto será exibido aqui.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="canvas">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Project Canvas</h3>
                <p className="text-gray-600">
                  Canvas do projeto será exibido aqui.
                </p>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </MainWrapper>
  );
};