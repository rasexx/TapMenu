
"use client";
import React, { useRef } from "react"; // Removed useEffect, useState as Framer Motion handles visibility
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, ScanLine, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"; // Import motion

const stepsData = [
  {
    icon: <Smartphone className="h-10 w-10 text-primary" aria-hidden="true" />,
    title: "1. Acerca tu teléfono",
    description: "El cliente simplemente acerca su smartphone al tag NFC en la mesa.",
     ariaLabel: "Paso 1: Acerca tu teléfono al tag NFC",
  },
  {
    icon: <ScanLine className="h-10 w-10 text-primary" aria-hidden="true" />,
    title: "2. Ve el menú",
    description: "El menú digital se abre instantáneamente en el navegador del móvil.",
    ariaLabel: "Paso 2: Visualiza el menú digital",
  },
  {
    icon: <UtensilsCrossed className="h-10 w-10 text-primary" aria-hidden="true" />,
    title: "3. Haz tu pedido",
    description: "Explora los platos, decide y ordena fácilmente (integración opcional).",
    ariaLabel: "Paso 3: Explora y haz tu pedido",
  },
];

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  ariaLabel: string;
  index: number; // Index for staggering animation
}

// Define animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({ // Pass index to stagger
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2, // Sequential delay
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
