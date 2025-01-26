import React from "react";
import { Card } from "@/components/ui/card";
import { Building2, GraduationCap, Users } from "lucide-react";

const Badge = ({ title, content, icon: Icon }) => (
  <Card className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
    <div className="absolute inset-0 bg-white dark:bg-gray-800 transition-opacity duration-300 ease-in-out group-hover:opacity-0" />
    <div className="relative flex items-center gap-6 p-8 transition-colors duration-300 group-hover:text-white">
      <div className="hidden md:flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white group-hover:scale-110">
        <Icon className="h-10 w-10" />
      </div>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
        <p className="text-muted-foreground group-hover:text-blue-100">
          {content}
        </p>
      </div>
    </div>
    <div className="absolute bottom-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
      <svg
        className="h-8 w-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </div>
  </Card>
);

export const HomeBadges = () => {
  const badges = [
    {
      title: "Para a comunidade",
      content:
        "O gat2way impulsiona a inovação, gerando soluções tecnológicas para os desafios da sociedade. A colaboração entre empresas e instituições fomenta o desenvolvimento de talentos e a Data de Criação de um ecossistema de inovação vibrante.",
      icon: Users,
    },
    {
      title: "Para empresas",
      content:
        "Conecte-se com talentos e projetos inovadores, agilize o desenvolvimento de novos produtos e serviços, e fortaleça sua marca como uma empresa comprometida com a inovação.",
      icon: Building2,
    },
    {
      title: "Para instituições",
      content:
        "Ofereça aos seus alunos a oportunidade de aplicar seus conhecimentos em projetos reais, promovendo a pesquisa e o desenvolvimento tecnológico e fortalecendo a relação entre academia e mercado.",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      {badges.map((badge, index) => (
        <Badge key={index} {...badge} />
      ))}
    </div>
  );
};
