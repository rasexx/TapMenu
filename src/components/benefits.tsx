
"use client"; // Add client directive for motion

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LightningBoltIcon } from '@radix-ui/react-icons';
import { ShieldCheck, RotateCw, Star } from "lucide-react";
import { motion } from "framer-motion"; // Import motion

const benefitsData = [
  {
    icon: <LightningBoltIcon className="h-8 w-8 text-primary" aria-hidden="true" />,
    title: "Rápido",
    description: "Acceso instantáneo al menú con un simple toque NFC.",
    ariaLabel: "Beneficio: Acceso rápido al menú mediante NFC",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />,
    title: "Seguro",
    description: "Experiencia sin contacto, higiénica y segura para tus clientes.",
     ariaLabel: "Beneficio: Menú digital seguro y sin contacto",
  },
  {
    icon: <RotateCw className="h-8 w-8 text-primary" aria-hidden="true" />,
    title: "Actualizable",
    description: "Modifica precios y platos en tiempo real, sin reimprimir.",
     ariaLabel: "Beneficio: Menú digital fácilmente actualizable en tiempo real",
  },
  {
    icon: <Star className="h-8 w-8 text-primary" aria-hidden="true" />,
    title: "Personalizable",
    description: "Adapta el diseño del menú a la identidad de tu marca.",
     ariaLabel: "Beneficio: Menú digital personalizable con la identidad de tu marca",
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
        aria-labelledby={`benefit-title-${title.toLowerCase()}`}
        aria-describedby={`benefit-desc-${title.toLowerCase()}`}>
        <CardHeader className="flex flex-col items-center gap-4 pb-4">
           <div className="bg-primary/10 p-3 rounded-full">
             {icon}
           </div>
          <CardTitle id={`benefit-title-${title.toLowerCase()}`} className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p id={`benefit-desc-${title.toLowerCase()}`} className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
);

export function Benefits() {
  return (
    <motion.section // Add motion to section
        id="beneficios"
        className="bg-secondary"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
    >
      <div className="container mx-auto"> {/* Use container padding */}
        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-12">
          Ventajas de TapMenu
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
        