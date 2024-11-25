import React from 'react';
import { 
  Building2, 
  BookOpenCheck, 
  Rocket, 
  Lightbulb 
} from 'lucide-react';

const AcademicIncentiveCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/10 rounded-lg p-4 flex items-center space-x-4 backdrop-blur-sm transition-transform hover:scale-105">
    <div className="bg-white/20 rounded-full p-3">
      <Icon className="text-white w-6 h-6" />
    </div>
    <div>
      <h3 className="text-white font-semibold text-lg">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </div>
  </div>
);

const HomeIncentivos = () => {
  const incentives = [
    {
      icon: Building2,
      title: 'Infraestrutura',
      description: 'Acesso a laboratórios e espaços de pesquisa'
    },
    {
      icon: BookOpenCheck,
      title: 'Bolsa',
      description: 'Suporte financeiro para desenvolvimento'
    },
    {
      icon: Rocket,
      title: 'Estágio',
      description: 'Oportunidades em empresas parceiras'
    },
    {
      icon: Lightbulb,
      title: 'Personalizado',
      description: 'Mentoria e suporte individualizado'
    }
  ];

  return (
    <div className="space-y-4 lg:w-1/3">
      {incentives.map((incentive, index) => (
        <AcademicIncentiveCard 
          key={index} 
          icon={incentive.icon} 
          title={incentive.title} 
          description={incentive.description} 
        />
      ))}
    </div>
  );
};

export default HomeIncentivos;