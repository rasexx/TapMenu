import Image from "next/image";

const CLIENTS = [
	{
		name: "Bioverde Consultores SAS",
		image: "/logos_clientes/Logo_Bioverde-removebg-preview.png",
		url: "https://www.instagram.com/bioverdesas",
		category: "Ingenieria Forestal y Paisajismo, Neiva - Huila",
	},
	{
		name: "La Movida Cartagena",
		image: "/logos_clientes/La_movida-removebg-preview.png",
		url: "https://www.instagram.com/lamovidacartagena",
		category: "Food & Drinks | Live Shows, Cartagena - Bolívar",
	},
	{
		name: "La Jugada Club House",
		image: "/logos_clientes/La_Jugada-removebg-preview.png",
		url: "https://www.instagram.com/lajugadaclubhouse",
		category: "Drinkery House | Cocktails & Parties, Cartagena - Bolívar",
	},
	{
		name: "Barra 7 Cartagena",
		image: "/logos_clientes/Barra_7-removebg-preview.png",
		url: "https://www.instagram.com/barra7cartagena",
		category: "Cocktail Bar, Cartagena - Bolívar",
	},
	{
		name: "Mamas Pizza Cartagena",
		image: "/logos_clientes/Mamas_pizza-removebg-preview.png",
		url: "https://www.instagram.com/mamaspizzactg",
		category: "Restaurante & Pizzeria, Cartagena - Bolívar",
	},
	{
		name: "Lobo de Mar Cartagena",
		image: "/logos_clientes/Lobo_de_Mar-removebg-preview.png",
		url: "https://www.instagram.com/lobodemarcartagena",
		category: "Food & CocktailBar, Cartagena - Bolívar",
	},
];

// Utilidad para tamaño proporcional
const LOGO_SIZES: Record<string, number> = {
	"Bioverde Consultores SAS": 1.5,
	"La Movida Cartagena": 0.8,
	"La Jugada Club House": 1.5,
	"Barra 7 Cartagena": 1.25,
	"Mamas Pizza Cartagena": 1.75,
	"Lobo de Mar Cartagena": 1,
};

export function ClientLogos() {
	// Helper to get width/height classes based on scale
	function getLogoSizeClasses(scale: number) {
		const width = 120 * scale;
		const height = 80 * scale;
		// Use Tailwind arbitrary values for width/height
		return `w-[${width}px] h-[${height}px]`;
	}
	return (
		<section className="py-16 bg-white dark:bg-metal-base border-t border-contrast/10 dark:border-metal-soft/10">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-contrast dark:text-metal-glow">
					Clientes que confían en TagMe
				</h2>
				<p className="text-center text-contrast/70 dark:text-metal-soft/70 mb-10">
					Diversidad comercial en nuestro portafolio
				</p>
				<div className="flex justify-center w-full">
					<div className="bg-transparent rounded-xl shadow-none p-6 w-full max-w-2xl flex flex-col gap-6">
						{CLIENTS.map((client) => {
							const scale = LOGO_SIZES[client.name] || 1;
							const sizeClasses = getLogoSizeClasses(scale);
							return (
								<a
									key={client.name}
									href={client.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col items-center group w-full gap-2 py-4 border-b last:border-b-0 border-contrast/10 dark:border-metal-soft/20 justify-center"
									aria-label={`Visitar Instagram de ${client.name}`}
								>
									<div
										className={`flex items-center justify-center transition-transform duration-300 group-hover:scale-105 rounded-md p-2 bg-transparent client-logo-box ${sizeClasses}`}
									>
										<Image
											src={client.image}
											alt={client.name}
											width={120 * scale}
											height={80 * scale}
											className="object-contain w-full h-auto"
											loading="lazy"
										/>
									</div>
									<span className="text-xs md:text-sm text-contrast/70 dark:text-metal-soft/70 text-center mt-2">
										{client.category}
									</span>
								</a>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
