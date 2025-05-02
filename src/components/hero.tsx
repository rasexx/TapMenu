
"use client"; // Add client directive for motion

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion"; // Import motion

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center text-center overflow-hidden" // Adjusted min-height
      // Apply gradient background directly
      style={{
          background: 'linear-gradient(to bottom, hsl(var(--primary) / 0.8), hsl(var(--secondary)))', // Subtle gradient from primary to secondary
      }}
    >
        {/* Background Image - Lower opacity */}
         <Image
            src="https://picsum.photos/1920/1080"
            alt="Restaurante moderno con clientes usando menú digital NFC en sus teléfonos" // More descriptive alt text
            layout="fill"
            objectFit="cover"
            quality={75} // Slightly lower quality for faster load
            priority
            className="absolute inset-0 z-0 opacity-15" // Reduced opacity further
            data-ai-hint="modern restaurant nfc menu phone"
        />
         {/* Removed Gradient Overlay - Handled by section style */}

        {/* Content with Framer Motion */}
        <motion.div
            className="container relative z-20 flex flex-col items-center" // Use container padding
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h1 className="font-bold tracking-tight text-foreground mb-6 text-2xl md:text-3xl lg:text-4xl"> {/* Responsive text sizes */}
                Menú digital al instante con solo un <span className="text-background">tap</span> {/* Highlight 'tap' with background color for contrast */}
            </h1>
            <p className="max-w-2xl text-lg text-foreground/80 md:text-xl lg:text-xl mb-10 leading-relaxed"> {/* Adjusted size, color, and leading */}
                Transforma la experiencia de tus clientes con menús interactivos, actualizables y accesibles desde cualquier smartphone.
            </p>
            <motion.div // Add motion to button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17, ease: "easeInOut" }}
            >
                <Button size="lg" asChild className="rounded-2xl">
                    <Link href="#paquetes" className="flex items-center gap-2" aria-label="Descubrir los paquetes de TapMenu">
                        Descubre los Paquetes
                        <ArrowDown className="h-5 w-5" aria-hidden="true" />
                    </Link>
                </Button>
            </motion.div>
        </motion.div>

         {/* Optional: Scroll Down Indicator */}
         <motion.div // Add motion to scroll indicator
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
             <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             >
                <ArrowDown className="h-6 w-6 text-foreground/50" aria-hidden="true"/>
            </motion.div>
         </motion.div>
    </section>
  );
}
