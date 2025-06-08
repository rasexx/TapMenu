
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

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
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate data fetching (replace with actual Firestore call)
    const timer = setTimeout(() => {
        const mockPackagesData: PackageData[] = [
           {
             id: "starter",
             name: "Starter",
             range: "1 – 3 tarjetas NFC",
             price: 69999,
             features: ["Programación básica del enlace (PDF o web simple)", "Código QR de respaldo"],
             ctaText: "Seleccionar Starter",
             recommended: false,
           },
           {
             id: "pyme",
             name: "Pyme",
             range: "5 – 15 tarjetas NFC",
             price: 64999,
             features: ["Todo lo de Starter", "Diseño personalizado (logo y colores)", "Menú web responsivo"],
             ctaText: "Seleccionar Pyme",
             recommended: true, // Marking Pyme as recommended
           },
           {
             id: "premium",
             name: "Premium",
             range: "Más de 15 tarjetas",
             price: 59999,
             features: ["Todo lo de Pyme", "Desarrollo de web app de menú con panel administrador", "Actualizaciones ilimitadas"],
             ctaText: "Seleccionar Premium",
             recommended: false,
           },
        ].sort((a, b) => a.price - b.price); // Sort by price ascending as per typical pricing page convention
      setPackages(mockPackagesData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return { packages, loading, error };
};

const formatPrice = (price: number): string => {
  try {
    // Format to COP currency, then remove 'COP' prefix/suffix
    const formattedWithCurrency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
    // Remove 'COP' and potential extra spaces
    return formattedWithCurrency.replace(/COP\s*/, '').trim();
  } catch (error) {
    console.error("Error formatting price:", error);
    // Fallback basic formatting
    const formatted = new Intl.NumberFormat('es-CO', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
    return `$${formatted}`;
  }
};

const scrollToContactAndSelectPackage = (packageId: string) => {
    const contactSection = document.getElementById('contact-section'); // Ensure footer has id="contact-section"
    if (contactSection) {
        // Update URL query param without full page reload
        const params = new URLSearchParams(window.location.search);
        params.set('paquete', packageId);
        const newUrl = `${window.location.pathname}?${params.toString()}#contact-section`;
        window.history.pushState({ path: newUrl }, '', newUrl);

        // Trigger scroll AFTER updating state/URL potentially needed by the contact form
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Dispatch a custom event if direct state passing isn't feasible/clean
        // window.dispatchEvent(new CustomEvent('packageSelected', { detail: { packageId } }));

    } else {
        console.warn("Contact section with id='contact-section' not found for scrolling.");
    }
};


const PackageCard: React.FC<PackageData> = ({ id, name, range, price, features, ctaText, recommended = false }) => (
  <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }} // Added hover effect
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
  >
      <Card className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 h-full ${recommended ? 'border-primary dark:border-metal-glow border-2 relative overflow-hidden' : 'border-border dark:border-metal-glow/30'} bg-contrast dark:bg-metal-soft/10`}> {/* Applied new palette, bg-contrast for light mode */}
        {recommended && (
            <div className="absolute top-0 right-0 bg-primary dark:bg-metal-glow text-primary-foreground dark:text-metal-base text-xs font-semibold px-3 py-1 transform translate-x-[29%] translate-y-[29%] rotate-45 origin-center whitespace-nowrap z-10" aria-label="Recomendado">
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
            <li key={index} className="flex items-start gap-2 text-sm text-dark dark:text-metal-soft"> {/* Changed text color to dark */}
                <CheckCircle className="h-4 w-4 text-green-500 dark:text-metal-chrome flex-shrink-0 mt-1" aria-hidden="true" />
                <span dangerouslySetInnerHTML={{ __html: feature }} /> {/* Careful with XSS if features come from untrusted source */}
            </li>
            ))}
        </ul>
        </CardContent>
        <CardFooter>
           <motion.div
                className="w-full"
                whileHover={{ scale: 1.02 }} // Slight scale on button container too
                transition={{ type: "spring", stiffness: 400, damping: 17, ease: "easeInOut" }}
            >
                <Button
                    variant="default"
                    size="default"
                    rounded="2xl"
                    className="w-full bg-primary hover:bg-dark text-contrast dark:bg-metal-pulse dark:hover:bg-metal-glow dark:text-metal-base" // Applied new palette
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
  <Card className="flex flex-col h-full bg-contrast dark:bg-metal-soft/10"> {/* Applied bg-contrast */}
    <CardHeader className="pb-4">
      <Skeleton className="h-6 w-3/4 mx-auto mb-2 bg-muted dark:bg-metal-steel/50" /> {/* Skeletons use bg-muted */}
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
        id="paquetes" // Keep this ID for scrolling
        className="bg-secondary dark:bg-metal-base py-8 md:py-16" // Adjusted padding
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16"> {/* Added container padding */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center text-primary dark:text-metal-accent sm:text-4xl mb-4"> {/* Adjusted heading size */}
           Menú de Paquetes
        </h2>
         <p className="text-lg text-muted-foreground dark:text-metal-soft/80 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
           Elige el plan que mejor se adapte a tus necesidades y empieza a digitalizar tu menú hoy mismo.
         </p>
         {error && <p className="text-center text-destructive mb-8">{error}</p>}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"> {/* Responsive grid */}
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
