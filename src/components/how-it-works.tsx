
"use client";
import React, { useRef } from "react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, ScanLine, UtensilsCrossed } from "lucide-react"; 
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"; 

const stepsData = [
  {
    icon: <Smartphone className="h-10 w-10 text-primary" aria-hidden="true" />,
    title: "1. Acerca tu teléfono",
    description: "Detecta automáticamente la tarjeta NFC (o escanea el QR de respaldo).",
    ariaLabel: "Paso 1: Acerca tu teléfono para detectar la tarjeta NFC o escanear QR",
  },
  {
    icon: <ScanLine className="h-10 w-10 text-primary" aria-hidden="true" />,
    title: "2. Ve el menú",
    description: "Se abre una web responsiva con categorías, fotos y descripciones.",
    ariaLabel: "Paso 2: Visualiza el menú web responsivo",
  },
  {
    icon: <UtensilsCrossed className="h-10 w-10 text-primary" aria-hidden="true" />,
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
  hidden: { opacity: 0, y: 50 },
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
        className="text-center shadow-lg h-full flex flex-col bg-card" // bg-card will be contrast (white)
        aria-labelledby={`step-title-${index + 1}`}
        aria-describedby={`step-desc-${index + 1}`}
        aria-label={ariaLabel} 
        >
        <CardHeader className="flex flex-col items-center gap-4 pb-4">
           {/* Icon's direct parent bg-primary/10 will use the new primary. Icon itself is text-primary. */}
           <div className="bg-primary/10 p-4 rounded-full"> 
             {icon}
           </div>
          <CardTitle id={`step-title-${index + 1}`} className="text-xl font-semibold text-primary">{title}</CardTitle> {/* Title text-primary */}
        </CardHeader>
        <CardContent className="flex-grow"> 
          <p id={`step-desc-${index + 1}`} className="text-foreground">{description}</p> {/* Description text-foreground (dark) */}
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
      className="bg-contrast" // Changed from bg-background to bg-contrast (white)
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }} 
    >
      <div className="container mx-auto"> 
        <h2 className="text-3xl font-bold tracking-tight text-center text-primary sm:text-4xl mb-12"> {/* Section title text-primary */}
          Así de fácil funciona
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <StepCard key={step.title} {...step} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
