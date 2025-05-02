
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion"; // Import motion
// import { collection, getDocs, query, orderBy, Firestore, getFirestore } from "firebase/firestore"; // Firestore imports commented out for now
// import { firebaseApp } from "@/lib/firebase";

// Define the structure of a package based on the new requirements
interface PackageData {
  id: string; // Document ID (starter, pyme, premium)
  name: string; // Package Name
  range: string; // Range of cards
  price: number; // Price per card
  features: string[]; // List of features
  ctaText: string; // Call to action text
  recommended?: boolean; // Optional recommended flag (keep for potential future use)
}

// --- Temporary Mock Hook (Using new data structure) ---
const usePackages = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const timer = setTimeout(() => {
        // Updated mock data based on the provided table
        const mockPackagesData: PackageData[] = [
           {
             id: "starter",
             name: "Starter",
             range: "1 – 3 tarjetas NFC",
             price: 70000, // Price per card
             features: ["Programación básica del enlace (PDF o web simple)", "Código QR de respaldo"],
             ctaText: "Seleccionar Starter",
             recommended: false, // Example: Starter is not recommended
           },
           {
             id: "pyme",
             name: "Pyme",
             range: "5 – 15 tarjetas NFC",
             price: 65000, // Price per card
             features: ["Todo lo de Starter", "Diseño personalizado (logo y colores)", "Menú web responsivo"],
             ctaText: "Seleccionar Pyme",
             recommended: true, // Example: Pyme is recommended
           },
           {
             id: "premium",
             name: "Premium",
             range: "Más de 15 tarjetas",
             price: 60000, // Price per card
             features: ["Todo lo de Pyme", "Desarrollo de web app de menú con panel administrador", "Actualizaciones ilimitadas"],
             ctaText: "Seleccionar Premium",
             recommended: false, // Example: Premium is not recommended
           },
        ];
      // TODO: When using Firestore, order by price *descending* if needed (as per original request which contradicts standard practice)
      // const sortedPackages = mockPackagesData.sort((a, b) => b.price - a.price);
      setPackages(mockPackagesData); // Using the defined order for now
      setLoading(false);
    }, 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  // TODO: Implement Firestore fetching logic here when ready
  /*
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null);
      try {
        // const db: Firestore = getFirestore(firebaseApp);
        // const packagesCol = collection(db, "packages");
        // const q = query(packagesCol, orderBy("price", "desc")); // Order by price DESC as requested
        // const packageSnapshot = await getDocs(q);
        // const packageList = packageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PackageData));
        // setPackages(packageList);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("No se pudieron cargar los paquetes. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);
  */

  return { packages, loading, error };
};
// --- End Temporary Mock Hook ---


// Format price as $XX.XXX
const formatPrice = (price: number): string => {
  try {
    // Format with es-CO locale for dot separators, no decimals
    const formatted = new Intl.NumberFormat('es-CO', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
    return `$${formatted}`; // Prepend $ sign
  } catch (error) {
    console.error("Error formatting price:", error);
    return `$${price.toString()}`; // Fallback
  }
};


const PackageCard: React.FC<PackageData> = ({ id, name, range, price, features, ctaText, recommended = false }) => (
  <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-full" // Ensure motion div takes full height
  >
      <Card className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 h-full ${recommended ? 'border-primary border-2 relative overflow-hidden' : 'border-border'}`}>
        {recommended && (
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 transform translate-x-[29%] translate-y-[29%] rotate-45 origin-center whitespace-nowrap z-10" aria-label="Paquete recomendado">
            Recomendado
            </div>
        )}
        <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center">{name}</CardTitle>
        {/* Updated range to show per card price */}
        <CardDescription className="text-center text-muted-foreground">{range}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
        {/* Updated price display */}
        <div className="text-center mb-6">
            <span className="text-4xl font-extrabold text-primary">{formatPrice(price)}</span>
            <span className="text-muted-foreground">/tarjeta</span>
        </div>
        <ul className="space-y-2">
            {features.map((feature, index) => (
            // Use dangerouslySetInnerHTML to render <br> tags from the feature strings
            <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" aria-hidden="true" />
                <span dangerouslySetInnerHTML={{ __html: feature }} />
            </li>
            ))}
        </ul>
        </CardContent>
        <CardFooter>
           <motion.div // Add motion to button container
                className="w-full"
                whileHover={{ scale: 1.05 }} // Scale on hover
                transition={{ type: "spring", stiffness: 400, damping: 17, ease: "easeInOut" }} // Smooth animation
            >
                <Button asChild className="w-full rounded-2xl" variant={recommended ? 'default' : 'outline'}>
                    {/* Updated CTA Link: Navigates to /#contacto and adds package query param */}
                    <Link href={`/#contacto?paquete=${id}`} aria-label={`${ctaText} paquete`}>{ctaText}</Link>
                </Button>
            </motion.div>
        </CardFooter>
      </Card>
  </motion.div>
);


const PackageSkeleton: React.FC = () => (
  <Card className="flex flex-col h-full"> {/* Ensure skeleton takes full height */}
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
       <Skeleton className="h-10 w-full rounded-2xl" />
    </CardFooter>
  </Card>
);


export function Packages() {
   const { packages, loading, error } = usePackages();

  return (
    <motion.section // Add motion to section
        id="paquetes" // Keep ID for navigation if needed
        className="bg-secondary"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
    >
      <div className="container mx-auto"> {/* Use container padding */}
        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-4">
           Menú de Paquetes {/* Updated section title */}
        </h2>
         <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
           Elige el plan que mejor se adapte a tus necesidades y empieza a digitalizar tu menú hoy mismo.
         </p>
         {error && <p className="text-center text-destructive mb-8">{error}</p>}
         {/* Responsive grid: 1 col mobile, 2 tablet, 3 desktop */}
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
           {/* Add message if no packages are found and not loading */}
           {!loading && !error && packages.length === 0 && (
                <p className="text-center text-muted-foreground md:col-span-2 lg:col-span-3">
                    No se encontraron paquetes disponibles en este momento.
                </p>
           )}
        </div>
      </div>
    </motion.section>
  );
}
