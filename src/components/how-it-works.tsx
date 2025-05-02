
"use client";
import React, { useRef } from "react"; // Removed useEffect, useState as Framer Motion handles visibility
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, ScanLine, UtensilsCrossed } from "lucide-react"; // Keep icons
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"; // Import motion

// Updated steps data
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
  index: number; // Index for staggering animation
}

// Define animation variants - Keep sequential delay
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({ // Pass index to stagger
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2, // Sequential delay of 0.2s
      duration: 0.5,
      ease: "easeInOut",
    },
  }),
};

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, ariaLabel, index }) => (
   <motion.div
    custom={index} // Pass index to variants
    initial="hidden"
    whileInView="visible" // Trigger animation when in view
    viewport={{ once: true, amount: 0.3 }} // Adjust viewport settings as needed
    variants={cardVariants} // Apply variants
    className="h-full" // Ensure motion div takes full height for layout
   >
       <Card
        className="text-center shadow-lg h-full flex flex-col" // Ensure card takes full height and uses flex column
        aria-labelledby={`step-title-${index + 1}`}
        aria-describedby={`step-desc-${index + 1}`}
        aria-label={ariaLabel} // Add overall aria-label for the step
        >
        <CardHeader className="flex flex-col items-center gap-4 pb-4">
           <div className="bg-primary/10 p-4 rounded-full">
             {icon}
           </div>
          <CardTitle id={`step-title-${index + 1}`} className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow"> {/* Make content grow to push footer down */}
          <p id={`step-desc-${index + 1}`} className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
   </motion.div>
);

export function HowItWorks() {
   const sectionRef = useRef<HTMLDivElement>(null);
   // Removed Intersection Observer logic, Framer Motion handles it

  return (
    <motion.section
      id="como-funciona"
      ref={sectionRef}
      className="bg-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }} // Animate section once
    >
      <div className="container mx-auto"> {/* Use container padding */}
        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-12">
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
