
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { HowItWorks } from "@/components/how-it-works";
import { Packages } from "@/components/packages";
import { Footer } from "@/components/footer";
import { Suspense } from "react";


export default function Home() {
  return (
     <>
        <Header />
        <main>
            <Hero />
            <Benefits />
            <HowItWorks />
             {/* Wrap Packages and Footer in Suspense for searchParams usage */}
             <Suspense fallback={<div>Cargando...</div>}>
                <Packages />
                <Footer />
             </Suspense>
        </main>
     </>
  );
}
