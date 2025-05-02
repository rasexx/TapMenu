
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
      className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center text-center overflow-hidden bg-cover bg-center" // Added bg-cover, bg-center
      // Apply background image directly via inline style
      style={{
          backgroundImage: "url('/hero-restaurant.jpg')", // Use the new image path
      }}
    >
        {/* Add overlay for text legibility */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div> {/* Increased opacity slightly */}


        {/* Content with Framer Motion */}
        <motion.div
            className="container relative z-20 flex flex-col items-center" // Ensure content is above overlay
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
             {/* Updated heading - Ensure 'tap' has same style */}
            <h1 className="font-bold tracking-tight text-white mb-6 text-2xl md:text-3xl lg:text-4xl"> {/* Changed text to white */}
                Menú digital al instante con solo un tap
            </h1>
             {/* Updated subtitle */}
            <p className="max-w-2xl text-lg text-white/90 md:text-xl lg:text-xl mb-10 leading-relaxed"> {/* Changed text to white/90 */}
                Olvídate de los códigos QR y las cartas físicas. Con nuestras tarjetas NFC tus clientes acceden al menú en un segundo, sin apps ni descargas.
            </p>
            <motion.div // Add motion to button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17, ease: "easeInOut" }}
            >
                <Button size="lg" asChild className="rounded-2xl">
                     {/* Updated button text and link to include hash */}
                    <Link href="/#paquetes" className="flex items-center gap-2" aria-label="Ver paquetes y precios de TapMenu">
                        Ver paquetes y precios
                        <ArrowDown className="h-5 w-5" aria-hidden="true" />
                    </Link>
                </Button>
            </motion.div>
        </motion.div>

         {/* Optional: Scroll Down Indicator */}
         <motion.div // Add motion to scroll indicator
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden md:block" // Ensure indicator is above overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
             <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             >
                 {/* Changed indicator color to white for better contrast */}
                <ArrowDown className="h-6 w-6 text-white/70" aria-hidden="true"/>
            </motion.div>
         </motion.div>
    </section>
  );
}
