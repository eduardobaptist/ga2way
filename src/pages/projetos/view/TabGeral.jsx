import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/Field";
import { toast } from "@/hooks/use-toast";
import { formatDatetime } from "@/lib/utils";

export const TabGeral = ({ projeto }) => {
  const formatTRL = (trl) => {
    const labels = {
      1: "1. A teoria",
      2: "2. O protótipo",
      3: "3. O MVP",
    };
    return labels[trl];
  };

  const formatAcatech = (acatech) => {
    const labels = {
      1: "1. Computadorização",
      2: "2. Conectividade",
      3: "3. Visibilidade",
    };
    return labels[acatech];
  };

  const formatPrioridade = (prioridade) => {
    const labels = {
      1: "Baixa",
      2: "Média",
      3: "Alta",
    };
    return labels[prioridade];
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

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Informações gerais</h2>
        <p className="text-sm text-muted-foreground mt-0">Overview do projeto</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <Field label="Nome" value={projeto.nome} />
        <Field label="Descrição" value={projeto.descricao} />
        <Field label="Programa do projeto" value={projeto.Programa?.nome} />
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
          value={`${formatTRL(projeto.trl) || "Indefinido"}`}
        />
        <Field
          label="Nível ACATECH"
          value={`${formatAcatech(projeto.acatech) || "Indefinido"}`}
        />
        <Field
          label="Prioridade"
          value={`${formatPrioridade(projeto.prioridade) || "Indefinido"}`}
        />
        <Field
          label="Status"
          value={
            projeto.status.charAt(0).toUpperCase() +
              projeto.status.slice(1).toLowerCase() || "Não informado"
          }
        />
        <Field
          label="Impulso"
          value={projeto.Impulso?.descricao || "Não informado"}
        />
        <Field
          label="Valor do impulso"
          value={
            projeto.Impulso?.valor
              ? `R$ ${parseFloat(projeto.Impulso.valor).toLocaleString(
                  "pt-BR",
                  { minimumFractionDigits: 2 }
                )}`
              : "Não informado"
          }
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
    </section>
  );
};
