import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { HowItWorks } from "@/components/how-it-works";
import { Packages } from "@/components/packages";
import { Footer } from "@/components/footer";
import { EmbeddedPresentation } from "@/components/embedded-presentation";
import { ClientLogos } from "@/components/client-logos";
import { Suspense } from "react";


export default function Home() {
  return (
     <>
        <Header />
        <main>
            <Hero />
            <Benefits />
            <EmbeddedPresentation />
            <HowItWorks />
            <ClientLogos />
             {/* Wrap Packages and Footer in Suspense because they use useSearchParams */}
             <Suspense fallback={<div>Cargando...</div>}>
                <Packages />
                <Footer />
             </Suspense>
        </main>
     </>
  );
}
