
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data - Replace with Firestore fetching later
const mockPackages = [
  {
    id: "basico",
    name: "Básico",
    range: "Hasta 10 Mesas",
    price: 70000,
    features: [
      "Menú digital ilimitado",
      "Actualizaciones en tiempo real",
      "Diseño estándar",
      "Soporte por email",
    ],
    ctaText: "Empezar Ahora",
  },
  {
    id: "pro",
    name: "Profesional",
    range: "Hasta 30 Mesas",
    price: 150000,
    features: [
      "Todo lo del Básico",
      "Diseño personalizable",
      "Estadísticas básicas",
      "Soporte prioritario",
    ],
    ctaText: "Elegir Pro",
    recommended: true,
  },
  {
    id: "premium",
    name: "Premium",
    range: "Mesas Ilimitadas",
    price: 250000,
    features: [
      "Todo lo del Profesional",
      "Integración con pedidos (opcional)",
      "Estadísticas avanzadas",
      "Soporte dedicado",
    ],
    ctaText: "Contactar Ventas",
  },
];

// Hook simulation (replace with actual Firestore hook later)
const usePackages = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setPackages(mockPackages);
      setLoading(false);
    }, 1500); // Simulate 1.5 second load time

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return { packages, loading };
};


interface PackageCardProps {
  id: string;
  name: string;
  range: string;
  price: number;
  features: string[];
  ctaText: string;
  recommended?: boolean;
}

const formatPrice = (price: number): string => {
  try {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  } catch (error) {
    console.error("Error formatting price:", error);
    return `$${price}`; // Fallback
  }
};

const PackageCard: React.FC<PackageCardProps> = ({ id, name, range, price, features, ctaText, recommended = false }) => (
  <Card className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 ${recommended ? 'border-primary border-2 relative overflow-hidden' : 'border-border'}`}>
     {recommended && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 transform translate-x-1/4 -translate-y-1/4 rotate-45">
          Recomendado
        </div>
      )}
    <CardHeader className="pb-4">
      <CardTitle className="text-2xl font-bold text-center">{name}</CardTitle>
      <CardDescription className="text-center text-muted-foreground">{range}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="text-center mb-6">
        <span className="text-4xl font-extrabold text-primary">{formatPrice(price)}</span>
        <span className="text-muted-foreground">/mes</span>
      </div>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button asChild className="w-full" variant={recommended ? 'default' : 'outline'}>
         <Link href={`#contacto?paquete=${id}`}>{ctaText}</Link>
      </Button>
    </CardFooter>
  </Card>
);

const PackageSkeleton: React.FC = () => (
  <Card className="flex flex-col">
    <CardHeader className="pb-4">
      <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
    </CardHeader>
    <CardContent className="flex-grow">
       <Skeleton className="h-10 w-1/2 mx-auto mb-6" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-4 w-4/5" />
      </div>
    </CardContent>
    <CardFooter>
       <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
);


export function Packages() {
   const { packages, loading } = usePackages();

  return (
    <section id="paquetes" className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-4">
          Planes Flexibles para tu Negocio
        </h2>
         <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
           Elige el plan que mejor se adapte a tus necesidades y empieza a digitalizar tu menú hoy mismo.
         </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
           {loading ? (
            <>
              <PackageSkeleton />
              <PackageSkeleton />
              <PackageSkeleton />
            </>
          ) : (
             packages.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
            ))
           )}
        </div>
      </div>
    </section>
  );
}

