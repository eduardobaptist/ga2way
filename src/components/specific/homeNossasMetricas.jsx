import React, { useState } from "react";
import {
  Lightbulb,
  Code,
  Beaker,
  Binary,
  Box,
  Factory,
  Rocket,
  CheckCircle,
  Globe,
  ClipboardList,
  Cog,
  Store,
} from "lucide-react";

const HomeNossasMetricas = ({ trlOnly, acatechOnly }) => {
  const trlData = [
    { id: 1, label: "Princípios Básicos", icon: Lightbulb },
    { id: 2, label: "Conceito Formulado", icon: Code },
    { id: 3, label: "Prova Conceitual", icon: Beaker },
    { id: 4, label: "Valid. Laboratório", icon: Binary },
    { id: 5, label: "Valid. Ambiente", icon: Box },
    { id: 6, label: "Protótipo", icon: Factory },
    { id: 7, label: "Demonstração", icon: Rocket },
    { id: 8, label: "Sistema Final", icon: CheckCircle },
    { id: 9, label: "Operação", icon: Globe },
  ];

  const acatechData = [
    { id: 1, label: "Planejamento", icon: ClipboardList },
    { id: 2, label: "Desenvolvimento", icon: Cog },
    { id: 3, label: "Manufatura", icon: Factory },
    { id: 4, label: "Introdução", icon: Store },
  ];

  const MetricCircle = ({ data, title }) => {
    const [hoveredId, setHoveredId] = useState(null);
    const radius = 180; // Aumentado de 140 para 180
    const hoverScale = 1.2; // Reduzido de 1.4 para 1.2 para evitar sobreposição

    const createSlice = (point, index, total) => {
      const angleStep = (2 * Math.PI) / total;
      const startAngle = index * angleStep - Math.PI / 2;
      const endAngle = startAngle + angleStep;
      const isHovered = hoveredId === point.id;

      // Calculate positions com raio interno maior
      const innerRadius = radius * 0.5; // Aumentado de 0.45 para 0.5
      const scaledRadius = isHovered ? radius * hoverScale : radius;
      
      // Create slice path
      const x1 = Math.cos(startAngle) * scaledRadius;
      const y1 = Math.sin(startAngle) * scaledRadius;
      const x2 = Math.cos(endAngle) * scaledRadius;
      const y2 = Math.sin(endAngle) * scaledRadius;
      const x3 = Math.cos(endAngle) * innerRadius;
      const y3 = Math.sin(endAngle) * innerRadius;
      const x4 = Math.cos(startAngle) * innerRadius;
      const y4 = Math.sin(startAngle) * innerRadius;

      const path = [
        `M ${x1} ${y1}`,
        `A ${scaledRadius} ${scaledRadius} 0 0 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4}`,
        "Z",
      ].join(" ");

      // Calculate icon position - mais próximo do centro do slice
      const midAngle = startAngle + angleStep / 2;
      const iconRadius = (scaledRadius + innerRadius) / 2;
      const iconX = Math.cos(midAngle) * iconRadius;
      const iconY = Math.sin(midAngle) * iconRadius;

      // Posição do texto ajustada para ter mais espaço
      const textRadius = scaledRadius + 40; // Aumentado de 30 para 40
      const textX = Math.cos(midAngle) * textRadius;
      const textY = Math.sin(midAngle) * textRadius;
      const textRotation = (midAngle * 180) / Math.PI + (midAngle > Math.PI / 2 && midAngle < 3 * Math.PI / 2 ? 180 : 0);

      const IconComponent = point.icon;

      return (
        <g
          key={point.id}
          className="transition-all duration-300 cursor-pointer"
          onMouseEnter={() => setHoveredId(point.id)}
          onMouseLeave={() => setHoveredId(null)}
          transform="translate(250, 250)" // Aumentado de 200 para 250 para centralizar melhor
        >
          <path
            d={path}
            className={`${isHovered ? "fill-blue-600" : "fill-blue-500"} transition-all duration-300`}
            stroke="white"
            strokeWidth="2"
          />
          <g
            transform={`translate(${iconX}, ${iconY})`}
            className={`transition-all duration-300 ${isHovered ? "scale-125" : ""}`}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </g>
          {isHovered && (
            <g transform={`translate(${textX}, ${textY})`}>
              <text
                className="text-sm font-medium fill-gray-700"
                textAnchor="middle"
                transform={`rotate(${textRotation})`}
              >
                {point.label}
              </text>
            </g>
          )}
        </g>
      );
    };

    return (
      <svg width="550" height="550" className="mx-auto"> {/* Aumentado de 450 para 550 */}
        <circle cx="250" cy="250" r="80" fill="white" /> {/* Ajustado centro e raio */}
        <text x="250" y="250" textAnchor="middle" className="font-bold text-xl fill-gray-800">
          {title}
        </text>
        {data.map((point, index) => createSlice(point, index, data.length))}
      </svg>
    );
  };

  if (!trlOnly && !acatechOnly) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <MetricCircle data={trlData} title="TRL" />
        <MetricCircle data={acatechData} title="ACATECH" />
      </div>
    );
  }

  return (
    <>
      {trlOnly && <MetricCircle data={trlData} title="TRL" />}
      {acatechOnly && <MetricCircle data={acatechData} title="ACATECH" />}
    </>
  );

//   return (
//     <div className="container mx-auto py-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         <MetricCircle data={trlData} title="TRL" />
//         <MetricCircle data={acatechData} title="ACATECH" />
//       </div>
//     </div>
//   );
};

export default HomeNossasMetricas;