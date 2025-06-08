"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ShieldCheck, RefreshCw, Paintbrush } from 'lucide-react'; // Using Lucide icons
import { motion } from "framer-motion";

const benefitsData = [
	{
		icon: <Zap className="h-8 w-8 text-primary dark:text-metal-glow" aria-hidden="true" />,
		title: "Rápido y fácil",
		description: "Los comensales abren tu menú con solo acercar su teléfono.",
		ariaLabel: "Beneficio: Menú rápido y fácil de acceder con NFC",
	},
	{
		icon: <ShieldCheck className="h-8 w-8 text-primary dark:text-metal-glow" aria-hidden="true" />,
		title: "Mayor seguridad",
		description: "Solo quien está en la mesa puede leer la tarjeta, evitando accesos no deseados.",
		ariaLabel: "Beneficio: Mayor seguridad con tarjetas NFC",
	},
	{
		icon: <RefreshCw className="h-8 w-8 text-primary dark:text-metal-glow" aria-hidden="true" />,
		title: "Actualizable al momento",
		description: "Cambia precios, platillos o disponibilidad sin reimprimir nada.",
		ariaLabel: "Beneficio: Menú digital actualizable al momento",
	},
	{
		icon: <Paintbrush className="h-8 w-8 text-primary dark:text-metal-glow" aria-hidden="true" />,
		title: "Diseño personalizado",
		description: "Tarjetas con tu logo y colores, integradas al estilo de tu restaurante.",
		ariaLabel: "Beneficio: Diseño de tarjetas NFC personalizado",
	},
];

interface BenefitCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	ariaLabel: string;
	index: number;
}

const cardVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: index * 0.15,
			duration: 0.5,
			ease: "easeInOut",
		},
	}),
};


const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, ariaLabel, index }) => (
	<motion.div
		custom={index}
		initial="hidden"
		whileInView="visible"
		viewport={{ once: true, amount: 0.3 }}
		variants={cardVariants}
		className="h-full"
	>
		<Card
			className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border hover:border-primary/20 dark:border-metal-glow/30 dark:bg-metal-soft/10 h-full flex flex-col bg-accent text-primary dark:text-metal-soft" // Applied new palette
			aria-label={ariaLabel}
			aria-labelledby={`benefit-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
			aria-describedby={`benefit-desc-${title.toLowerCase().replace(/\s+/g, '-')}`}>
			<CardHeader className="flex flex-col items-center gap-4 pb-4">
				<div className="bg-accent-foreground/10 dark:bg-metal-glow/10 p-3 rounded-full">
					{icon}
				</div>
				<CardTitle id={`benefit-title-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-xl font-semibold text-primary dark:text-metal-soft">{title}</CardTitle>
			</CardHeader>
			<CardContent className="flex-grow">
				<p id={`benefit-desc-${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary/80 dark:text-metal-soft/80 leading-relaxed">{description}</p>
			</CardContent>
		</Card>
	</motion.div>
);

export function Benefits() {
	return (
		<motion.section
			id="beneficios"
			className="bg-secondary dark:bg-metal-base py-8 md:py-16" // Adjusted padding
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			viewport={{ once: true }}
		>
			<div className="container mx-auto px-2 sm:px-4 md:px-8 lg:px-16"> {/* Responsive padding */}
				<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center text-primary dark:text-metal-accent mb-8 sm:mb-12"> {/* Responsive heading size and margin */}
					¿Por qué NFC?
				</h2>
				<div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{benefitsData.map((benefit, index) => (
						<BenefitCard key={index} {...benefit} index={index} />
					))}
				</div>
			</div>
		</motion.section>
	);
}
