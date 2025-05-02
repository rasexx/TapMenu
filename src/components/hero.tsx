
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden bg-secondary">
        {/* Background Image */}
         <Image
            src="https://picsum.photos/1920/1080"
            alt="Restaurante moderno con clientes usando menú digital"
            layout="fill"
            objectFit="cover"
            quality={80}
            priority // Load image immediately
            className="absolute inset-0 z-0 opacity-30"
            data-ai-hint="modern restaurant menu"
        />
         {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background/90 z-10"></div>

        {/* Content */}
        <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                Menú digital al instante con solo un <span className="text-primary">tap</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground md:text-xl lg:text-2xl mb-10">
                Transforma la experiencia de tus clientes con menús interactivos, actualizables y accesibles desde cualquier smartphone.
            </p>
            <Button size="lg" asChild>
                <Link href="#paquetes" className="flex items-center gap-2">
                    Descubre los Paquetes
                    <ArrowDown className="h-5 w-5" />
                </Link>
            </Button>
        </div>

         {/* Optional: Scroll Down Indicator */}
         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block">
            <ArrowDown className="h-6 w-6 text-foreground/50" />
         </div>
    </section>
  );
}
