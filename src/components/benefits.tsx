
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LightningBoltIcon } from '@radix-ui/react-icons'; // Keep LightningBoltIcon from Radix
import { ShieldCheck, RotateCw, Star } from "lucide-react"; // Import replacements from lucide-react


const benefitsData = [
  {
    icon: <LightningBoltIcon className="h-8 w-8 text-primary" aria-hidden="true" />,
    title: "Rápido",
    description: "Acceso instantáneo al menú con un simple toque NFC.",
    ariaLabel: "Beneficio: Acceso rápido al menú",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />, // Use ShieldCheck from lucide
    title: "Seguro",
    description: "Experiencia sin contacto, higiénica y segura para tus clientes.",
     ariaLabel: "Beneficio: Menú seguro y sin contacto",
  },
  {
    icon: <RotateCw className="h-8 w-8 text-primary" aria-hidden="true" />, // Use RotateCw from lucide
    title: "Actualizable",
    description: "Modifica precios y platos en tiempo real, sin reimprimir.",
     ariaLabel: "Beneficio: Menú fácilmente actualizable",
  },
  {
    icon: <Star className="h-8 w-8 text-primary" aria-hidden="true" />, // Use Star from lucide
    title: "Personalizable",
    description: "Adapta el diseño del menú a la identidad de tu marca.",
     ariaLabel: "Beneficio: Menú personalizable",
  },
];

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  ariaLabel: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, ariaLabel }) => (
  <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-transparent hover:border-primary/20" aria-labelledby={`benefit-title-${title.toLowerCase()}`} aria-describedby={`benefit-desc-${title.toLowerCase()}`}>
    <CardHeader className="flex flex-col items-center gap-4 pb-4">
       <div className="bg-primary/10 p-3 rounded-full">
         {icon}
       </div>
      <CardTitle id={`benefit-title-${title.toLowerCase()}`} className="text-xl font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p id={`benefit-desc-${title.toLowerCase()}`} className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export function Benefits() {
  return (
    <section id="beneficios" className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-12">
          Ventajas de TapMenu
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefitsData.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}

