"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ShieldCheck, RefreshCw, Paintbrush } from 'lucide-react'; // Using Lucide icons
import { motion } from "framer-motion";
import { FiZap, FiSmartphone, FiEdit, FiBarChart2, FiShield } from "react-icons/fi";

const benefitsData = [
  {
    icon: <Zap className="h-8 w-8 text-primary dark:text-metal-glow" aria-hidden="true" />,
    title: "Rápido y fácil",
    description: "Los comensales abren tu menú con solo acercar su teléfono.",
    ariaLabel: "Beneficio: Menú rápido y fácil de acceder con NFC",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary dark:text-metal-glow" aria-hidden="true" />,
    title: "Mayor seguridad",
    description: "Solo quien está en la mesa puede leer la tarjeta, evitando accesos no deseados.",
     ariaLabel: "Beneficio: Mayor seguridad con tarjetas NFC",
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-primary dark:text-metal-glow" aria-hidden="true" />,
    title: "Actualizable al momento",
    description: "Cambia precios, platillos o disponibilidad sin reimprimir nada.",
     ariaLabel: "Beneficio: Menú digital actualizable al momento",
  },
  {
    icon: <Paintbrush className="h-8 w-8 text-primary dark:text-metal-glow" aria-hidden="true" />,
    title: "Diseño personalizado",
    description: "Tarjetas con tu logo y colores, integradas al estilo de tu restaurante.",
     ariaLabel: "Beneficio: Diseño de tarjetas NFC personalizado",
  },
];

const BENEFITS = [
  {
    icon: <FiZap className="text-[#64FFB3]" size={36} />,
    title: "Un solo toque",
    desc: "Guarda contacto, abre link o CV con solo acercar el móvil."
  },
  {
    icon: <FiSmartphone className="text-[#64FFB3]" size={36} />,
    title: "Imagen premium",
    desc: "Tecnología NFC con diseño metálico profesional."
  },
  {
    icon: <FiEdit className="text-[#64FFB3]" size={36} />,
    title: "Actualizable en tiempo real",
    desc: "Cambia tu perfil sin reimprimir nada."
  },
  {
    icon: <FiBarChart2 className="text-[#64FFB3]" size={36} />,
    title: "Métricas de impacto",
    desc: "Recibe estadísticas de uso (externas)."
  },
  {
    icon: <FiShield className="text-[#64FFB3]" size={36} />,
    title: "Seguro por diseño",
    desc: "Solo funciona por proximidad física (<4 cm)."
  },
];

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  ariaLabel: string;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.5,
      ease: "easeInOut",
    },
  }),
};


const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, ariaLabel, index }) => (
    <motion.div
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        className="h-full"
    >
      <Card
        className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border hover:border-primary/20 dark:border-metal-glow/30 dark:bg-metal-soft/10 h-full flex flex-col bg-accent text-primary dark:text-metal-soft" // Applied new palette
        aria-label={ariaLabel}
        aria-labelledby={`benefit-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
        aria-describedby={`benefit-desc-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        <CardHeader className="flex flex-col items-center gap-4 pb-4">
           <div className="bg-accent-foreground/10 dark:bg-metal-glow/10 p-3 rounded-full">
             {icon}
           </div>
          <CardTitle id={`benefit-title-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-xl font-semibold text-primary dark:text-metal-soft">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p id={`benefit-desc-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary/80 dark:text-metal-soft/80 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
);

export function Benefits() {
  return (
    <section
        id="beneficios"
        className="bg-[#E4E9EC] dark:bg-[#003D73] py-20 px-4 font-[Poppins,Inter,sans-serif]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#003D73] dark:text-[#64FFB3] mb-4 text-center">¿Por qué TagMe?</h2>
        <p className="text-lg md:text-xl text-[#003D73] dark:text-[#E4E9EC] mb-12 text-center max-w-2xl">
          Más rápido que un QR. Más profesional que una tarjeta de papel.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
          {BENEFITS.map((b, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl shadow-sm hover:shadow-lg transition bg-white dark:bg-[#003D73] border border-[#E4E9EC] dark:border-[#64FFB3]">
              <div className="mb-4">{b.icon}</div>
              <h3 className="text-xl font-bold text-[#003D73] dark:text-[#64FFB3] mb-2">{b.title}</h3>
              <p className="text-base text-[#003D73] dark:text-[#E4E9EC] opacity-80">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ComparisonTable() {
  const rows = [
    {
      label: "Velocidad",
      tagme: "1 tap → contacto o link instantáneo",
      qr: "Abrir cámara + enfocar"
    },
    {
      label: "Imagen",
      tagme: "Gadget premium, profesional",
      qr: "Percepción low-cost"
    },
    {
      label: "Actualización",
      tagme: "Editas el perfil en segundos",
      qr: "Requiere reimprimir el QR"
    },
    {
      label: "Datos",
      tagme: "Analytics por lugar/hora (vía integración)",
      qr: "Difícil rastreo de visitas"
    },
    {
      label: "Seguridad",
      tagme: "Proximidad física protege la información",
      qr: "Cualquiera puede copiar el QR"
    }
  ];
  return (
    <section className="w-full bg-[#E4E9EC] dark:bg-[#003D73] py-16 px-4 font-[Poppins,Inter,sans-serif]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#003D73] dark:text-[#64FFB3] mb-8 text-center">Comparado con los códigos QR…</h2>
        {/* Desktop/tablet grid */}
        <div className="hidden md:grid grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-sm border border-[#E4E9EC] dark:border-[#64FFB3] bg-white dark:bg-[#003D73]">
          <div className="bg-[#E4E9EC] dark:bg-[#003D73] p-4 text-center font-bold text-[#003D73] dark:text-[#64FFB3] text-lg border-b border-[#E4E9EC] dark:border-[#64FFB3]">TagMe (NFC)</div>
          <div className="bg-[#E4E9EC] dark:bg-[#003D73] p-4 text-center font-bold text-[#003D73] dark:text-[#64FFB3] text-lg border-b border-[#E4E9EC] dark:border-[#64FFB3]">QR tradicional</div>
          {rows.map((row, i) => (
            <React.Fragment key={i}>
              <div className={"p-4 border-b " + (i === rows.length - 1 ? "border-0" : "border-[#E4E9EC] dark:border-[#64FFB3]") + " text-[#003D73] dark:text-[#E4E9EC]"}>{row.tagme}</div>
              <div className={"p-4 border-b " + (i === rows.length - 1 ? "border-0" : "border-[#E4E9EC] dark:border-[#64FFB3]") + " text-[#003D73] dark:text-[#E4E9EC]"}>{row.qr}</div>
            </React.Fragment>
          ))}
        </div>
        {/* Mobile stacked version */}
        <div className="md:hidden flex flex-col gap-6 mt-4">
          {rows.map((row, i) => (
            <div key={i} className="bg-white dark:bg-[#003D73] rounded-2xl shadow-sm border border-[#E4E9EC] dark:border-[#64FFB3] p-4 flex flex-col gap-2">
              <div className="font-bold text-[#003D73] dark:text-[#64FFB3] text-base mb-1">{row.label}</div>
              <div className="flex flex-col gap-1">
                <div className="text-[#003D73] dark:text-[#E4E9EC] text-sm"><span className="font-semibold text-[#64FFB3]">TagMe:</span> {row.tagme}</div>
                <div className="text-[#003D73] dark:text-[#E4E9EC] text-sm"><span className="font-semibold text-[#003D73] dark:text-[#64FFB3]">QR:</span> {row.qr}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
