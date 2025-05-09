
"use client"; 

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ShieldCheck, RefreshCw, Paintbrush } from 'lucide-react';
import { motion } from "framer-motion"; 

const benefitsData = [
  {
    icon: <Zap className="h-8 w-8 text-primary" aria-hidden="true" />, 
    title: "Rápido y fácil",
    description: "Los comensales abren tu menú con solo acercar su teléfono.",
    ariaLabel: "Beneficio: Menú rápido y fácil de acceder con NFC",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />, 
    title: "Mayor seguridad",
    description: "Solo quien está en la mesa puede leer la tarjeta, evitando accesos no deseados.",
     ariaLabel: "Beneficio: Mayor seguridad con tarjetas NFC",
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-primary" aria-hidden="true" />, 
    title: "Actualizable al momento",
    description: "Cambia precios, platillos o disponibilidad sin reimprimir nada.",
     ariaLabel: "Beneficio: Menú digital actualizable al momento",
  },
  {
    icon: <Paintbrush className="h-8 w-8 text-primary" aria-hidden="true" />, 
    title: "Diseño personalizado",
    description: "Tarjetas con tu logo y colores, integradas al estilo de tu restaurante.",
     ariaLabel: "Beneficio: Diseño de tarjetas NFC personalizado",
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
        className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-border hover:border-primary/20 h-full flex flex-col bg-accent text-primary" // Added bg-accent, text-primary. Updated border to border-border.
        aria-label={ariaLabel} 
        aria-labelledby={`benefit-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
        aria-describedby={`benefit-desc-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        <CardHeader className="flex flex-col items-center gap-4 pb-4">
           {/* Icon's direct parent bg-primary/10 will use the new primary. Icon itself is text-primary. */}
           <div className="bg-primary/10 p-3 rounded-full"> 
             {icon}
           </div>
          <CardTitle id={`benefit-title-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          {/* Description text will inherit text-primary from Card or can be set to text-foreground if needed for contrast on bg-accent */}
          <p id={`benefit-desc-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-foreground/80 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
);

export function Benefits() {
  return (
    <motion.section 
        id="beneficios" 
        className="bg-background" // Changed from bg-secondary to bg-background
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
    >
      <div className="container mx-auto"> 
        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-12">
           ¿Por qué NFC? 
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefitsData.map((benefit, index) => (
            <BenefitCard key={benefit.title} {...benefit} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
