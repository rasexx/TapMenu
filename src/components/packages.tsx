"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const PLANS = [
	{
		name: "Starter",
		features: ["1 tarjeta PVC", "Perfil editable 1 año"],
		price: "$49.900 COP",
		priceColor: "#64FFB3",
		description: "Ideal para freelancers",
		cta: "Solicita cotización",
		highlight: false,
	},
	{
		name: "Pro",
		features: ["5 tarjetas", "Dashboard básico"],
		price: "$39.900 COP (c/u)",
		priceColor: "#64FFB3",
		description: "Equipos pequeños",
		cta: "Solicita cotización",
		highlight: false,
	},
	{
		name: "Business",
		features: ["25 tarjetas", "Analytics + webhook CRM"],
		price: "$29.900 COP (c/u)",
		priceColor: "#64FFB3",
		description: "Fuerzas de ventas",
		cta: "Solicita cotización",
		highlight: true,
	},
	{
		name: "Enterprise",
		features: ["100+ unidades", "Branding white-label + soporte prioritario"],
		price: "Precio negociable (~$15.000 c/u)",
		priceColor: "#64FFB3",
		description: "Contacta ventas para propuesta personalizada",
		cta: "Habla con ventas",
		highlight: false,
	},
];

export function Packages() {
	return (
		<section className="w-full bg-white py-20 px-4 font-[Poppins,Inter,sans-serif]">
			<div className="max-w-7xl mx-auto flex flex-col items-center">
				<h2 className="text-3xl md:text-4xl font-extrabold text-[#003D73] mb-4 text-center">
					Planes y Precios
				</h2>
				<p className="text-lg md:text-xl text-[#003D73] mb-12 text-center max-w-2xl">
					Elige el paquete que mejor se adapta a tu marca
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-2 sm:px-4 md:px-8 py-6 md:py-10 w-full">
					{PLANS.map((plan, i) => (
						<motion.div
							key={plan.name}
							whileHover={{
								y: -12,
								boxShadow: "0 8px 32px 0 rgba(0,61,115,0.12)",
							}}
							className={`relative flex flex-col items-center bg-white border border-[#E4E9EC] rounded-2xl p-8 shadow-sm transition-all duration-200 ${
								plan.highlight
									? "ring-2 ring-[#003D73] shadow-lg"
									: ""
							}`}
						>
							{plan.highlight && (
								<span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#003D73] text-white text-xs font-bold px-4 py-1 rounded-full shadow-md z-10">
									Más popular
								</span>
							)}
							<h3 className="text-2xl font-bold text-[#003D73] mb-2">
								{plan.name}
							</h3>
							<ul className="mb-4 space-y-1 text-[#003D73] text-base">
								{plan.features.map((f, idx) => (
									<li key={idx}>• {f}</li>
								))}
							</ul>
							<div className="text-2xl font-extrabold mb-2 text-[#64FFB3]">
								{plan.price}
							</div>
							<div className="text-sm text-[#003D73] mb-6 opacity-80 text-center">
								{plan.description}
							</div>
							<a
								href="#contact-section"
								className="inline-block bg-[#003D73] text-white font-bold rounded-full px-6 py-3 text-base shadow-md transition-colors duration-200 hover:bg-[#64FFB3] hover:text-[#003D73] focus:outline-none focus:ring-2 focus:ring-[#003D73] focus:ring-offset-2"
							>
								{plan.cta}
							</a>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
