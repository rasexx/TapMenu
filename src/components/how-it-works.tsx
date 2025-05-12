
"use client";
import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, ScanLine, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const stepsData = [
  {
    icon: <Smartphone className="h-10 w-10 text-metal-glow dark:text-metal-chrome" aria-hidden="true" />,
    title: "1. Acerca tu teléfono",
    description: "Detecta automáticamente la tarjeta NFC (o escanea el QR de respaldo).",
    ariaLabel: "Paso 1: Acerca tu teléfono para detectar la tarjeta NFC o escanear QR",
  },
  {
    icon: <ScanLine className="h-10 w-10 text-metal-glow dark:text-metal-chrome" aria-hidden="true" />,
    title: "2. Ve el menú",
    description: "Se abre una web responsiva con categorías, fotos y descripciones.",
    ariaLabel: "Paso 2: Visualiza el menú web responsivo",
  },
  {
    icon: <UtensilsCrossed className="h-10 w-10 text-metal-glow dark:text-metal-chrome" aria-hidden="true" />,
    title: "3. Haz tu pedido",
    description: "Selecciona platos, comparte tu selección con el mesero o envía tu orden digitalmente.",
    ariaLabel: "Paso 3: Selecciona platos y haz tu pedido",
  },
];

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  ariaLabel: string;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.5,
      ease: "easeInOut",
    },
  }),
};

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, ariaLabel, index }) => (
   <motion.div
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={cardVariants}
    className="h-full"
   >
       <Card
        className="text-center shadow-md h-full flex flex-col bg-contrast dark:bg-metal-soft/10 border border-metal-glow/20 rounded-xl p-6" // Updated dark bg, border, padding
        aria-labelledby={`step-title-${index + 1}`}
        aria-describedby={`step-desc-${index + 1}`}
        aria-label={ariaLabel}
        >
        <CardHeader className="flex flex-col items-center gap-4 pb-4">
           <div className="bg-primary/10 dark:bg-metal-glow/10 p-4 rounded-full">
             {icon} {/* Icon color updated in stepsData */}
           </div>
          <CardTitle id={`step-title-${index + 1}`} className="text-lg font-semibold text-metal-steel dark:text-metal-accent">{title}</CardTitle> {/* Updated text colors */}
        </CardHeader>
        <CardContent className="flex-grow">
          <p id={`step-desc-${index + 1}`} className="text-sm text-metal-steel/80 dark:text-metal-soft">{description}</p> {/* Updated text colors */}
        </CardContent>
      </Card>
   </motion.div>
);

export function HowItWorks() {
   const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      id="como-funciona"
      ref={sectionRef}
      className="bg-contrast dark:bg-metal-base py-8 md:py-16" // Changed light bg to white, adjusted padding
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16"> {/* Added container padding */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center text-primary dark:text-metal-accent sm:text-4xl mb-12"> {/* Adjusted heading size */}
          Así de fácil funciona
        </h2>
        <div className="grid grid-cols-1 gap-y-8 gap-x-8 md:grid-cols-3 md:gap-8"> {/* Increased mobile gap */}
          {stepsData.map((step, index) => (
            <StepCard key={step.title} {...step} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
