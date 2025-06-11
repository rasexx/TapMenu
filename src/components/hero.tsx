"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { FaRegIdCard, FaHandPointer } from "react-icons/fa";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center bg-[#E4E9EC] font-[Poppins,Inter,sans-serif] py-20 md:py-32"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between z-20 gap-12">
        {/* Columna izquierda: texto */}
        <div className="flex-1 flex flex-col items-start text-left gap-8">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#003D73] mb-2 font-poppins leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            Un toque. Conecta.
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-[#003D73] mb-6 font-inter max-w-2xl md:max-w-3xl lg:max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            La tarjeta NFC inteligente para networking y marca personal.
          </motion.p>
          <motion.a
            href="#contact-section"
            className="inline-block bg-[#003D73] text-white font-bold rounded-full px-10 py-4 text-lg shadow-lg transition-colors duration-200 hover:bg-[#64FFB3] hover:text-[#003D73] focus:outline-none focus:ring-2 focus:ring-[#003D73] focus:ring-offset-2"
            style={{ fontFamily: 'Poppins, Inter, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            Solicita tu demo
          </motion.a>
        </div>
        {/* Columna derecha: gráfico animado */}
        <motion.div
          className="flex-1 flex justify-center items-center mt-12 md:mt-0"
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
