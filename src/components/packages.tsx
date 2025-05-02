
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion"; // Import motion
import { collection, getDocs, query, orderBy, Firestore, getFirestore } from "firebase/firestore"; // Import Firestore functions
import { firebaseApp } from "@/lib/firebase"; // Assume firebaseApp is initialized here


// Define the structure of a package document in Firestore
interface PackageData {
  id: string; // Document ID
  name: string;
  range: string;
  price: number;
  features: string[];
  ctaText: string;
  recommended?: boolean;
}

// --- Firestore Hook (Simulated for now, replace with actual implementation) ---
// const usePackages = () => {
//   const [packages, setPackages] = useState<PackageData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPackages = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // TODO: Initialize Firestore properly
//         // const db: Firestore = getFirestore(firebaseApp); // Get Firestore instance
//         // const packagesCol = collection(db, "packages");
//         // const q = query(packagesCol, orderBy("price", "asc")); // Order by price ASCENDING as per common practice
//         // const packageSnapshot = await getDocs(q);
//         // const packageList = packageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PackageData));
//         // setPackages(packageList);

//         // --- MOCK DATA (Remove when Firestore is connected) ---
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
//         const mockPackagesData: PackageData[] = [
//            { id: "starter", name: "Starter", range: "Hasta 10 Mesas", price: 60000, features: ["Menú digital ilimitado", "Actualizaciones en tiempo real", "Diseño estándar", "Soporte por email"], ctaText: "Seleccionar Starter" },
//            { id: "pyme", name: "Pyme", range: "Hasta 30 Mesas", price: 120000, features: ["Todo lo del Starter", "Diseño personalizable", "Estadísticas básicas", "Soporte prioritario"], ctaText: "Seleccionar Pyme", recommended: true },
//            { id: "premium", name: "Premium", range: "Mesas Ilimitadas", price: 200000, features: ["Todo lo del Pyme", "Integración con pedidos", "Estadísticas avanzadas", "Soporte dedicado"], ctaText: "Seleccionar Premium" },
//         ];
//         setPackages(mockPackagesData);
//          // --- END MOCK DATA ---

//       } catch (err) {
//         console.error("Error fetching packages:", err);
//         setError("No se pudieron cargar los paquetes. Inténtalo de nuevo.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPackages();
//   }, []); // Fetch only once on mount

//   return { packages, loading, error };
// };
// --- End Firestore Hook ---


// --- Temporary Mock Hook (Replace with above Firestore hook later) ---
const usePackages = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const timer = setTimeout(() => {
        const mockPackagesData: PackageData[] = [
           { id: "starter", name: "Starter", range: "Hasta 10 Mesas", price: 60000, features: ["Menú digital ilimitado", "Actualizaciones en tiempo real", "Diseño estándar", "Soporte por email"], ctaText: "Seleccionar Starter" },
           { id: "pyme", name: "Pyme", range: "Hasta 30 Mesas", price: 120000, features: ["Todo lo del Starter", "Diseño personalizable", "Estadísticas básicas", "Soporte prioritario"], ctaText: "Seleccionar Pyme", recommended: true },
           { id: "premium", name: "Premium", range: "Mesas Ilimitadas", price: 200000, features: ["Todo lo del Pyme", "Integración con pedidos", "Estadísticas avanzadas", "Soporte dedicado"], ctaText: "Seleccionar Premium" },
        ];
      setPackages(mockPackagesData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return { packages, loading, error };
};
// --- End Temporary Mock Hook ---


// Format price without currency symbol
const formatPrice = (price: number): string => {
  try {
    // Format with COP, then remove the currency symbol part
    const formatted = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
    return formatted.replace('COP', '').trim(); // Remove 'COP' and trim whitespace
  } catch (error) {
    console.error("Error formatting price:", error);
    return `$${price.toLocaleString('es-CO', {minimumFractionDigits: 0})}`; // Fallback with '$'
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
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                <span>{feature}</span>
            </li>
            ))}
        </ul>
        </CardContent>
        <CardFooter>
           <motion.div // Add motion to button container
                className="w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17, ease: "easeInOut" }}
            >
                <Button asChild className="w-full rounded-2xl" variant={recommended ? 'default' : 'outline'}>
                    <Link href={`/#contacto?paquete=${id}`} aria-label={`Seleccionar paquete ${name}`}>{ctaText}</Link>
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
        id="paquetes"
        className="bg-secondary"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
    >
      <div className="container mx-auto"> {/* Use container padding */}
        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-4">
          Planes Flexibles para tu Negocio
        </h2>
         <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
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
