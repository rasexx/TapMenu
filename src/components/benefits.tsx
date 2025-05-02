
"use client"; // Add client directive for motion

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Use lucide-react icons
import { Zap, ShieldCheck, RefreshCw, Paintbrush } from 'lucide-react';
import { motion } from "framer-motion"; // Import motion

// Updated benefits data using lucide-react icons
const benefitsData = [
  {
    icon: <Zap className="h-8 w-8 text-primary" aria-hidden="true" />, // Replaced LightningBoltIcon
    title: "Rápido y fácil",
    description: "Los comensales abren tu menú con solo acercar su teléfono.",
    ariaLabel: "Beneficio: Menú rápido y fácil de acceder con NFC",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />, // Replaced ShieldIcon with ShieldCheck
    title: "Mayor seguridad",
    description: "Solo quien está en la mesa puede leer la tarjeta, evitando accesos no deseados.",
     ariaLabel: "Beneficio: Mayor seguridad con tarjetas NFC",
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-primary" aria-hidden="true" />, // Replaced ReloadIcon
    title: "Actualizable al momento",
    description: "Cambia precios, platillos o disponibilidad sin reimprimir nada.",
     ariaLabel: "Beneficio: Menú digital actualizable al momento",
  },
  {
    icon: <Paintbrush className="h-8 w-8 text-primary" aria-hidden="true" />, // Replaced StarIcon with Paintbrush for customization
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
  index: number; // Add index for staggering
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15, // Stagger animation
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
        className="h-full" // Ensure motion div takes full height
    >
      <Card
        className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-transparent hover:border-primary/20 h-full flex flex-col"
        aria-label={ariaLabel} // Use the specific ariaLabel prop
        aria-labelledby={`benefit-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
        aria-describedby={`benefit-desc-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        <CardHeader className="flex flex-col items-center gap-4 pb-4">
           <div className="bg-primary/10 p-3 rounded-full">
             {icon}
           </div>
          <CardTitle id={`benefit-title-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p id={`benefit-desc-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
);

export function Benefits() {
  return (
    <motion.section // Add motion to section
        id="beneficios" // Keep ID consistent if used for navigation
        className="bg-secondary"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
    >
      <div className="container mx-auto"> {/* Use container padding */}
        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-12">
           ¿Por qué NFC? {/* Updated Section Title */}
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
