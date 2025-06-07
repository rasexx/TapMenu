"use client";
import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, ScanLine, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

const glowColors = {
	light: "shadow-[0_0_24px_8px_rgba(0,180,255,0.4)]",
	dark: "shadow-[0_0_32px_12px_rgba(0,255,255,0.25)]",
};

interface StepCardProps {
	icon: React.ElementType;
	title: string;
	description: string;
	video: string;
	ariaLabel: string;
	index: number;
	isActive: boolean;
	onClick: () => void;
}

function StepCard({ icon: Icon, title, description, video, ariaLabel, index, isActive, onClick }: StepCardProps) {
	return (
		<div className="relative flex flex-col items-center">
			{/* Card front/back (rotating) */}
			<motion.div
				initial={false}
				animate={isActive ? "flipped" : "default"}
				variants={{
					default: { rotateY: 0 },
					flipped: { rotateY: 180 },
				}}
				transition={{ duration: 0.6, ease: [0.4, 0.2, 0.2, 1] }}
				style={{ perspective: "1200px" }}
				className="w-full"
			>
				<div className="relative w-full h-64 card-perspective">
					{/* Front */}
					<motion.button
						type="button"
						aria-label={ariaLabel}
						className={
							"absolute inset-0 w-full h-full bg-contrast dark:bg-metal-soft/10 border border-metal-glow/20 rounded-xl flex flex-col items-center justify-center cursor-pointer select-none card-face-front"
						}
						style={{ zIndex: isActive ? 0 : 2 }}
						onClick={onClick}
						tabIndex={0}
						whileTap={{ scale: 0.97 }}
					>
						<motion.div
							className={
								"flex items-center justify-center rounded-full bg-white dark:bg-metal-base mb-4 shadow-lg icon-glow"
							}
							animate={{
								boxShadow: [
									"0 0 0 0 rgba(0,180,255,0.4)",
									"0 0 32px 12px rgba(0,180,255,0.6)",
									"0 0 0 0 rgba(0,180,255,0.4)",
								],
								scale: [1, 1.13, 1],
							}}
							transition={{
								duration: 1.6,
								repeat: Infinity,
								repeatType: "loop",
								ease: "easeInOut",
							}}
							style={{ width: 72, height: 72 }}
						>
							<Icon className="h-12 w-12 text-primary dark:text-metal-glow" aria-hidden="true" />
						</motion.div>
						<span className="block text-lg font-semibold text-metal-steel dark:text-metal-accent mb-2 mt-2">
							{title.replace(/^\d+\. /, "")}
						</span>
					</motion.button>
					{/* Back (video) */}
					{isActive && (
						<div
							className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/90 rounded-xl card-face-back card-face-back-active"
							onClick={onClick}
						>
							<video
								key={video}
								src={video}
								autoPlay
								loop
								muted
								playsInline
								className="w-full h-full object-cover rounded-xl video-maxheight"
								style={{ transform: 'scaleX(-1)' }} // Invierte horizontalmente para compensar el flip
							/>
						</div>
					)}
				</div>
			</motion.div>
			{/* Description below, only if active, OUTSIDE the rotating container */}
			<motion.div
				initial={false}
				animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
				transition={{ duration: 0.4 }}
				className="absolute left-0 right-0 mx-auto mt-4 px-2"
				style={{ top: '100%', minHeight: 0, pointerEvents: 'none' }}
			>
				{isActive && (
					<div className="bg-white/90 dark:bg-metal-base/90 rounded-lg shadow-lg p-4 text-center text-sm text-metal-steel dark:text-metal-soft max-w-xs mx-auto">
						{description}
					</div>
				)}
			</motion.div>
		</div>
	);
}

export function HowItWorks() {
	const [active, setActive] = useState(-1);
	const sectionRef = useRef<HTMLDivElement>(null);

	return (
		<motion.section
			id="como-funciona"
			ref={sectionRef}
			className="bg-contrast dark:bg-metal-base py-8 md:py-16"
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			viewport={{ once: true }}
		>
			<div className="container mx-auto px-4 md:px-8 lg:px-16">
				<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center text-primary dark:text-metal-accent sm:text-4xl mb-12">
					Toca una tarjeta para ver como funciona
				</h2>
				<div className="grid grid-cols-1 gap-y-8 gap-x-8 md:grid-cols-3 md:gap-8">
					{stepsData.map((step, idx) => (
						<StepCard
							key={step.title}
							icon={step.icon}
							title={step.title}
							description={step.description}
							video={step.video}
							ariaLabel={step.ariaLabel}
							index={idx}
							isActive={active === idx}
							onClick={() => setActive(active === idx ? -1 : idx)}
						/>
					))}
				</div>
			</div>
		</motion.section>
	);
}
