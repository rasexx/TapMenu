"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center text-center overflow-hidden bg-background"
    >
        <div className="absolute inset-0 bg-primary/5 z-10"></div>

        <motion.div
            className="container relative z-20 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h1 className="font-bold tracking-tight text-primary mb-6">
                Menú digital al instante con solo un tap
            </h1>
            <p className="max-w-2xl text-lg text-primary/90 md:text-xl lg:text-xl mb-10 leading-relaxed">
                Olvídate de los códigos QR y las cartas físicas. Con nuestras tarjetas NFC tus clientes acceden al menú en un segundo, sin apps ni descargas.
            </p>
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17, ease: "easeInOut" }}
            >
                <Button
                  size="lg"
                  asChild
                  variant="default"
                  rounded="2xl"
                  className="hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background"
                >
                    <Link href="/#paquetes" className="flex items-center gap-2" aria-label="Ver paquetes y precios de TapMenu">
                        Ver paquetes y precios
                        <ArrowDown className="h-5 w-5" aria-hidden="true" />
                    </Link>
                </Button>
            </motion.div>
        </motion.div>

         <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
             <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             >
                <ArrowDown className="h-6 w-6 text-primary/70" aria-hidden="true"/>
            </motion.div>
         </motion.div>
    </section>
  );
}
