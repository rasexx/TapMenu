import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Benefits, ComparisonTable } from "@/components/benefits";
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
            <ComparisonTable />
            <Packages />
            <Suspense fallback={<div>Cargando...</div>}>
                <Footer />
            </Suspense>
        </main>
     </>
  );
}
