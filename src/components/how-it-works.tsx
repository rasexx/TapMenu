"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, ScanLine, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

const stepsData = [
	{
		icon: Smartphone,
		title: "1. Acerca tu teléfono",
		description: "Detecta automáticamente la tarjeta NFC (o escanea el QR de respaldo).",
		video: "/videos/1.mp4",
		ariaLabel: "Paso 1: Acerca tu teléfono para detectar la tarjeta NFC o escanear QR",
	},
	{
		icon: ScanLine,
		title: "2. Ve el menú",
		description: "Se abre una web responsiva con categorías, fotos y descripciones.",
		video: "/videos/2.mp4",
		ariaLabel: "Paso 2: Visualiza el menú web responsivo",
	},
	{
		icon: UtensilsCrossed,
		title: "3. Haz tu pedido",
		description: "Selecciona platos, comparte tu selección con el mesero o envía tu orden digitalmente.",
		video: "/videos/3.mp4",
		ariaLabel: "Paso 3: Selecciona platos y haz tu pedido",
	},
];

export function HowItWorks() {
	const [activeStep, setActiveStep] = useState(0);
	return (
		<section id="como-funciona" className="bg-background dark:bg-background py-16 px-4 font-[Poppins,Inter,sans-serif] transition-colors">
			<div className="max-w-6xl mx-auto flex flex-col items-center">
				<h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-[#64FFB3] mb-4 text-center transition-colors">
					¿Cómo funciona?
				</h2>
				<p className="text-lg md:text-xl text-primary dark:text-[#E4E9EC] mb-12 text-center max-w-2xl transition-colors">
					Así de simple es usar TagMe en tu negocio
				</p>
				<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
					{stepsData.map((step, idx) => (
						<div key={step.title} className="flex flex-col items-center">
							<div className="relative w-full h-64 flex flex-col items-center justify-center">
								<motion.button
									type="button"
									aria-label={step.ariaLabel}
									className="absolute inset-0 w-full h-full bg-contrast dark:bg-metal-soft/10 border border-metal-glow/20 rounded-xl flex flex-col items-center justify-center cursor-pointer select-none card-face-front"
									style={{ zIndex: activeStep === idx ? 0 : 2 }}
									onClick={() => setActiveStep(idx)}
									tabIndex={0}
									whileTap={{ scale: 0.97 }}
								>
									<div className="flex items-center justify-center rounded-full bg-white dark:bg-metal-base mb-4 shadow-lg icon-glow w-[72px] h-[72px]">
										<step.icon className="h-12 w-12 text-primary dark:text-metal-glow" aria-hidden="true" role="presentation" />
									</div>
									<span className="block text-lg font-semibold text-metal-steel dark:text-metal-accent mb-2 mt-2">
										{step.title.replace(/^\d+\. /, "")}
									</span>
								</motion.button>
								{/* Video */}
								<video
									className="rounded-xl shadow-lg w-full h-40 object-cover mt-4 border border-[#E4E9EC] dark:border-[#64FFB3] bg-black"
									src={step.video}
									controls
									aria-label={`Video demostrativo paso ${idx + 1}`}
									preload="none"
									poster="/logos_clientes/Logo_Bioverde-removebg-preview.png"
								/>
							</div>
							<p className="mt-4 text-base text-primary dark:text-[#E4E9EC] text-center max-w-xs">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
