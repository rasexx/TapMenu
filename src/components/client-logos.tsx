import Image from "next/image";

const CLIENTS = [
	{
		name: "Bioverde SAS",
		image: "/logos_clientes/Logo_Bioverde-removebg-preview.png",
		url: "https://www.instagram.com/bioverdesas",
		category: "Productos orgánicos y saludables",
	},
	{
		name: "Grupo la Movida",
		image: "/logos_clientes/Grupo_la_Movida-removebg-preview.png",
		url: "https://www.instagram.com/grupolamovida.co",
		category: "Grupo empresarial de entretenimiento",
	},
	{
		name: "La Movida Cartagena",
		image: "/logos_clientes/La_movida-removebg-preview.png",
		url: "https://www.instagram.com/lamovidacartagena",
		category: "Bar y discoteca",
	},
	{
		name: "La Jugada Club House",
		image: "/logos_clientes/La_Jugada-removebg-preview.png",
		url: "https://www.instagram.com/lajugadaclubhouse",
		category: "Club social y bar",
	},
	{
		name: "Barra 7 Cartagena",
		image: "/logos_clientes/Barra_7-removebg-preview.png",
		url: "https://www.instagram.com/barra7cartagena",
		category: "Bar deportivo",
	},
	{
		name: "Mamas Pizza Cartagena",
		image: "/logos_clientes/Mamas_pizza-removebg-preview.png",
		url: "https://www.instagram.com/mamaspizzactg",
		category: "Pizzería y restaurante",
	},
	{
		name: "Lobo de Mar Cartagena",
		image: "/logos_clientes/Lobo_de_Mar-removebg-preview.png",
		url: "https://www.instagram.com/lobodemarcartagena",
		category: "Restaurante de mariscos",
	},
];

// Utilidad para tamaño proporcional
const LOGO_SIZES = {
	"Bioverde SAS": 1.5,
	"Grupo la Movida": 1.25,
	"La Movida Cartagena": 0.8,
	"La Jugada Club House": 1.5,
	"Barra 7 Cartagena": 1.25,
	"Mamas Pizza Cartagena": 1.75,
	"Lobo de Mar Cartagena": 1,
};

export function ClientLogos() {
	return (
		<section className="py-16 bg-white dark:bg-metal-base border-t border-contrast/10 dark:border-metal-soft/10">
			<div className="container mx-auto px-2 xs:px-4 md:px-8 lg:px-16">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-contrast dark:text-metal-glow">
					Clientes que confían en TapMenu
				</h2>
				<p className="text-center text-contrast/70 dark:text-metal-soft/70 mb-10">
					Diversidad comercial en nuestro portafolio
				</p>
				<div className="w-full flex justify-center">
					<div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8 w-full max-w-4xl mx-auto items-center">
						{CLIENTS.map((client) => {
							const scale = LOGO_SIZES[client.name] || 1;
							return (
								<a
									key={client.name}
									href={client.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col items-center group h-32 xs:h-36 sm:h-40 justify-end w-full"
									aria-label={`Visitar Instagram de ${client.name}`}
								>
									<div
										className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110 w-full"
										style={{ maxWidth: `${144 * scale}px`, maxHeight: `${112 * scale}px` }}
									>
										<Image
											src={client.image}
											alt={client.name}
											width={160 * scale}
											height={110 * scale}
											className="object-contain w-full h-auto max-h-20 xs:max-h-24"
											loading="lazy"
										/>
									</div>
									<span className="mt-2 text-xs text-center text-contrast/60 dark:text-metal-soft/60 min-h-5 flex items-end w-full break-words">
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
