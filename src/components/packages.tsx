
"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import packagesDataFromJson from '@/data/packages.json'; // Import local JSON

interface PackageData {
  id: string;
  name: string;
  range: string;
  price: number;
  features: string[];
  ctaText: string;
  recommended?: boolean;
}

const usePackages = () => {
  // Directly return the imported data.
  // The 'loading' and 'error' states are for when data is fetched asynchronously.
  // For static JSON, loading is always false and error is null.
  return { packages: packagesDataFromJson as PackageData[], loading: false, error: null };
};

const formatPrice = (price: number): string => {
  try {
    const formattedWithCurrency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
    return formattedWithCurrency.replace('COP', '').trim();
  } catch (error) {
    console.error("Error formatting price:", error);
    const formatted = new Intl.NumberFormat('es-CO', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
    return `$${formatted}`;
  }
};

const scrollToContactAndSelectPackage = (packageId: string) => {
    const contactSection = document.getElementById('contacto');
    const params = new URLSearchParams(window.location.search);
    params.set('paquete', packageId);
    const newUrl = `${window.location.pathname}?${params.toString()}#contacto`;
    // window.history.pushState({ path: newUrl }, '', newUrl); // Causes issues in some environments if window is not fully available

    if (typeof window !== 'undefined') {
      window.history.pushState({ path: newUrl }, '', newUrl);
      // Trigger a custom event or update state that Footer can listen to,
      // as direct DOM scroll might happen before Footer's useEffect for searchParams runs.
      // For simplicity, we rely on Footer's existing useEffect for now.
    }


    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.warn("Contact section with id='contacto' not found for scrolling.");
    }
};


const PackageCard: React.FC<PackageData> = ({ id, name, range, price, features, ctaText, recommended = false }) => (
  <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
  >
      <Card className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 h-full ${recommended ? 'border-primary dark:border-metal-glow border-2 relative overflow-hidden' : 'border-border dark:border-metal-glow/30'} bg-card dark:bg-metal-soft/10`}>
        {recommended && (
            <div className="absolute top-0 right-0 bg-primary dark:bg-metal-glow text-primary-foreground dark:text-metal-base text-xs font-semibold px-3 py-1 transform translate-x-[29%] translate-y-[29%] rotate-45 origin-center whitespace-nowrap z-10" aria-label="Paquete recomendado">
            Recomendado
            </div>
        )}
        <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center text-primary dark:text-metal-accent">{name}</CardTitle>
        <CardDescription className="text-center text-muted-foreground dark:text-metal-soft/70">{range}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
        <div className="text-center mb-6">
            <span className="text-4xl font-extrabold text-primary dark:text-metal-accent">{formatPrice(price)}</span>
            <span className="text-sm text-muted-foreground dark:text-metal-soft/70">/tarjeta</span>
        </div>
        <ul className="space-y-2">
            {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-foreground dark:text-metal-soft">
                <CheckCircle className="h-4 w-4 text-green-500 dark:text-metal-chrome flex-shrink-0 mt-1" aria-hidden="true" />
                <span dangerouslySetInnerHTML={{ __html: feature }} />
            </li>
            ))}
        </ul>
        </CardContent>
        <CardFooter>
           <motion.div
                className="w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17, ease: "easeInOut" }}
            >
                <Button
                    variant="default"
                    size="default"
                    rounded="2xl"
                    className="w-full bg-metal-pulse hover:bg-metal-glow text-metal-base" // Specific styling for package buttons
                    onClick={() => scrollToContactAndSelectPackage(id)}
                    aria-label={`${ctaText} y ver detalles de contacto`}
                >
                    {ctaText}
                </Button>
            </motion.div>
        </CardFooter>
      </Card>
  </motion.div>
);


const PackageSkeleton: React.FC = () => (
  <Card className="flex flex-col h-full bg-card dark:bg-metal-soft/10">
    <CardHeader className="pb-4">
      <Skeleton className="h-6 w-3/4 mx-auto mb-2 bg-muted dark:bg-metal-steel/50" />
      <Skeleton className="h-4 w-1/2 mx-auto bg-muted dark:bg-metal-steel/50" />
    </CardHeader>
    <CardContent className="flex-grow">
       <Skeleton className="h-10 w-1/2 mx-auto mb-6 bg-muted dark:bg-metal-steel/50" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full bg-muted dark:bg-metal-steel/50" />
        <Skeleton className="h-4 w-5/6 bg-muted dark:bg-metal-steel/50" />
         <Skeleton className="h-4 w-full bg-muted dark:bg-metal-steel/50" />
         <Skeleton className="h-4 w-4/5 bg-muted dark:bg-metal-steel/50" />
      </div>
    </CardContent>
    <CardFooter>
       <Skeleton className="h-10 w-full rounded-2xl bg-muted dark:bg-metal-steel/50" />
    </CardFooter>
  </Card>
);


export function Packages() {
   const { packages, loading, error } = usePackages();

  return (
    <motion.section
        id="paquetes"
        className="bg-secondary dark:bg-metal-base"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-center text-primary dark:text-metal-accent sm:text-4xl mb-4">
           Menú de Paquetes
        </h2>
         <p className="text-lg text-muted-foreground dark:text-metal-soft/80 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
           Elige el plan que mejor se adapte a tus necesidades y empieza a digitalizar tu menú hoy mismo.
         </p>
         {error && <p className="text-center text-destructive mb-8">{error}</p>}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
           {loading ? ( // This will likely not show skeletons anymore as loading is immediately false
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
           {!loading && !error && packages.length === 0 && (
                <p className="text-center text-muted-foreground dark:text-metal-soft/70 md:col-span-2 lg:col-span-3">
                    No se encontraron paquetes disponibles en este momento.
                </p>
           )}
        </div>
      </div>
    </motion.section>
  );
}
