
"use client";
import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, ScanLine, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

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
  isVisible: boolean;
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, ariaLabel, isVisible, index }) => (
   <Card
    className={cn(
        "text-center shadow-lg transition-all duration-700 ease-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}
    style={{ transitionDelay: `${index * 150}ms` }} // Stagger animation
    aria-labelledby={`step-title-${index + 1}`}
    aria-describedby={`step-desc-${index + 1}`}
    >
    <CardHeader className="flex flex-col items-center gap-4 pb-4">
       <div className="bg-primary/10 p-4 rounded-full">
         {icon}
       </div>
      <CardTitle id={`step-title-${index + 1}`} className="text-xl font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p id={`step-desc-${index + 1}`} className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export function HowItWorks() {
   const sectionRef = useRef<HTMLDivElement>(null);
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Unobserve after first animation
          // observer.unobserve(entry.target);
        }
        // Optional: Reset animation if element leaves viewport
        // else {
        //   setIsVisible(false);
        // }
      },
      {
        root: null, // relative to document viewport
        rootMargin: '0px', // margin around root
        threshold: 0.1, // 10% of item visible triggers observer
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);


  return (
    <section id="como-funciona" ref={sectionRef} className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-12">
          Así de fácil funciona
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <StepCard key={step.title} {...step} isVisible={isVisible} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

