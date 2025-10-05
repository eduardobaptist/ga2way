import { useState, useMemo } from "react";
import { CheckCircle, XCircle, Clock, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/Field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { formatDatetime } from "@/lib/utils";
import api from "@/axios";

export const TabPropostas = ({ projeto, onRefresh }) => {
  // Extract all interests from all offers in the project
  const allInteresses = useMemo(() => {
    if (!projeto?.Oferta?.length) return [];

    return projeto.Oferta.reduce((acc, oferta) => {
      if (oferta.interesses?.length) {
        return [...acc, ...oferta.interesses];
      }
      return acc;
    }, []);
  }, [projeto]);

  // Categorize interests by their status
  const categorizedInteresses = useMemo(() => {
    const pendentes = allInteresses.filter(
      (interesse) => interesse.status === "pendente"
    );
    const aprovadas = allInteresses.filter(
      (interesse) => interesse.status === "aceito"
    );
    const naoAprovadas = allInteresses.filter(
      (interesse) =>
        interesse.status === "rejeitada" || interesse.status === "rejeitado"
    );

    return { pendentes, aprovadas, naoAprovadas };
  }, [allInteresses]);

  // Component to render individual interest item
  const InteresseItem = ({ interesse, showActions = false }) => {
    const usuario = interesse.Usuario;
    const empresa = usuario?.Responsavels?.[0]?.Empresa;
    const ict = usuario?.Responsavels?.[0]?.Ict;

    // Handle approval of interest
    const handleApprove = async (id) => {
      try {
        await api.post("/parcerias", {
          interesse_id: id,
        });

        toast({
          title: `Proposta aprovada com sucesso`,
          variant: "success",
        });

        onRefresh();
      } catch (error) {
        toast({
          title: "Erro ao aprovar proposta",
          variant: "destructive",
        });
      }
    };

    // Handle rejection of interest
    const handleReject = async (id) => {
      try {
        await api.patch(`/interesses/rejeitar/${id}`);

        toast({
          title: `Proposta rejeitada com sucesso`,
          variant: "success",
        });

        onRefresh();
      } catch (error) {
        toast({
          title: "Erro ao rejeitar proposta",
          variant: "destructive",
        });
      }
    };

    return (
      <div className="border border-gray-100 rounded-lg p-6 bg-white shadow-sm hover:shadow-lg hover:border-gray-200">
        <div className="flex flex-col space-y-6">
          {/* ICT Profile Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border p-1 flex items-center justify-center">
              {ict?.foto_perfil ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}${ict?.foto_perfil}`}
                  className="w-full h-full object-contain rounded-full"
                  alt={`${ict?.nome} profile`}
                />
              ) : (
                <ImageOff className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {ict?.nome}
              </h3>
            </div>
          </div>

          {/* Proposal Text */}
          {interesse.proposta && (
            <div>
              <Field label="Proposta" value={interesse.proposta} />
            </div>
          )}

          {/* User Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Enviado por"
              value={`${usuario?.nome} (${usuario?.email})`}
            />
            <Field
              label="Submetido em"
              value={formatDatetime(interesse.createdAt)}
            />
          </div>

          {/* Action Buttons (only for pending proposals) */}
          {showActions && (
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <Button
                onClick={() => handleApprove(interesse.id)}
                className="text-black hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 flex-1"
                variant="outline"
              >
                <CheckCircle className="mr-2 text-emerald-600" size="16" />
                Aprovar Proposta
              </Button>
              <Button
                onClick={() => handleReject(interesse.id)}
                className="text-black hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 flex-1"
                variant="outline"
              >
                <XCircle className="mr-2 text-rose-600" size="16" />
                Rejeitar Proposta
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Propostas por status</h2>
        <p className="text-sm text-muted-foreground mt-0">Propostas pendentes possuem ação de aprovar e rejeitar</p>
      </div>
      <div className="animate-in fade-in-50 duration-500">
        <div className="space-y-6">
          <Accordion type="multiple" className="w-full space-y-4">
            {/* Pending Proposals Section */}
            <AccordionItem
              value="propostas-pendentes"
              className="border border-amber-200/60 rounded-lg shadow-sm overflow-hidden hover:shadow-md hover:border-amber-300/70"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline bg-gradient-to-br from-amber-50/80 via-yellow-50/60 to-orange-50/80 hover:from-amber-100/80 hover:via-yellow-100/70 hover:to-orange-100/80">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-lg">
                    {categorizedInteresses.pendentes.length}
                  </Badge>
                  <div className="text-left">
                    <span className="font-semibold text-amber-800  text-lg">
                      Propostas pendentes
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pt-4">
                  {categorizedInteresses.pendentes.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-lg">
                        Nenhuma proposta pendente
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {categorizedInteresses.pendentes.map((interesse) => (
                        <InteresseItem
                          key={interesse.id}
                          interesse={interesse}
                          showActions={true}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Approved Proposals Section */}
            <AccordionItem
              value="propostas-aprovadas"
              className="border border-emerald-200/60 rounded-lg shadow-sm overflow-hidden hover:shadow-md hover:border-emerald-300/70"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline bg-gradient-to-br from-emerald-50/80 via-emerald-50/60 to-teal-50/80 hover:from-emerald-100/80 hover:via-emerald-100/70 hover:to-teal-100/80">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-lg">
                    {categorizedInteresses.aprovadas.length}
                  </Badge>
                  <div className="text-left">
                    <span className="font-semibold text-emerald-800  text-lg">
                      Propostas aprovadas
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pt-4">
                  {categorizedInteresses.aprovadas.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-lg">
                        Nenhuma proposta aprovada ainda
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {categorizedInteresses.aprovadas.map((interesse) => (
                        <InteresseItem
                          key={interesse.id}
                          interesse={interesse}
                          showActions={false}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Rejected Proposals Section */}
            <AccordionItem
              value="propostas-rejeitadas"
              className="border border-rose-200/60 rounded-lg shadow-sm overflow-hidden hover:shadow-md hover:border-rose-300/70"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline bg-gradient-to-br from-rose-50/80 via-rose-50/60 to-pink-50/80 hover:from-rose-100/80 hover:via-rose-100/70 hover:to-pink-100/80">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-lg">
                    {categorizedInteresses.naoAprovadas.length}
                  </Badge>
                  <div className="text-left">
                    <span className="font-semibold text-rose-800 text-lg">
                      Propostas não aprovadas
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pt-4">
                  {categorizedInteresses.naoAprovadas.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-lg">
                        Nenhuma proposta rejeitada
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {categorizedInteresses.naoAprovadas.map((interesse) => (
                        <InteresseItem
                          key={interesse.id}
                          interesse={interesse}
                          showActions={false}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
