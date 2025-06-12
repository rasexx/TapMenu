"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { FaHandPointer } from "react-icons/fa";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center bg-[#E4E9EC] font-[Poppins,Inter,sans-serif] py-12 px-4 sm:px-6 md:py-20 md:px-8 lg:px-16"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20">
        {/* Columna izquierda: texto */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8">
          <motion.h1
            className="text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold text-[#003D73] mb-2 font-poppins leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            Un toque. Conecta.
          </motion.h1>
          <motion.p
            className="text-[clamp(1.1rem,3vw,2rem)] text-[#003D73] mb-6 font-inter max-w-xl md:max-w-2xl lg:max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            La tarjeta NFC inteligente para networking y marca personal.
          </motion.p>
          <Button
            asChild
            size="lg"
            className="w-full md:w-auto mt-6 bg-[#64FFB3] text-[#003D73] hover:bg-[#003D73] hover:text-[#64FFB3] dark:bg-[#64FFB3] dark:text-[#003D73] dark:hover:bg-[#003D73] dark:hover:text-[#64FFB3] font-bold shadow-lg rounded-2xl px-8 py-4 transition-colors"
            aria-label="Solicitar demo por WhatsApp"
          >
            <a href="https://wa.me/573241083976?text=Hola%20quiero%20una%20demo%20de%20TagMe" target="_blank" rel="noopener noreferrer" aria-label="Abrir conversación en WhatsApp">
              Solicita tu demo
            </a>
          </Button>
        </div>
        {/* Columna derecha: gráfico animado */}
        <motion.div
          className="flex justify-center items-center mt-12 md:mt-0"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: [40, 0, 20, 0], scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }}
            className="relative flex flex-col items-center justify-center"
          >
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="90" cy="90" r="80" fill="#003D73" />
              <rect x="70" y="60" width="40" height="60" rx="8" fill="#64FFB3" stroke="#003D73" strokeWidth="4" />
            </svg>
            <FaHandPointer size={48} color="#003D73" style={{ position: 'absolute', left: 66, top: 110 }} />
            {/* Ondas NFC animadas */}
            <motion.svg
              width="180" height="180" viewBox="0 0 180 180" fill="none" style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0.7, 1], scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
            >
              <path d="M120 90c0-16.57-13.43-30-30-30" stroke="#64FFB3" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M130 90c0-22.09-17.91-40-40-40" stroke="#64FFB3" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M140 90c0-27.61-22.39-50-50-50" stroke="#64FFB3" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
