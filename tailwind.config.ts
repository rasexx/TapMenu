
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
          DEFAULT: '1rem',
          md: '2rem',
          lg: '4rem',
      },
      screens: {
        "2xl": "1400px",
      },
    },
  	extend: {
        fontFamily: {
           sans: ["var(--font-sans)", ...fontFamily.sans],
        },
  		colors: {
        primary: '#2B405D',       // Azul oscuro profesional (Used for Light Mode Primary)
        accent: '#A9BCCF',        // Azul gris metálico (Used for Light Mode Accent)
        background: 'hsl(var(--background))', // Uses CSS variable
        foreground: 'hsl(var(--foreground))', // Uses CSS variable
        contrast: '#FFFFFF',      // Blanco puro (Mainly for Light Mode text on dark primary)
        dark: '#1C1C1C',          // Gris antracita (Used for Light Mode text, or Dark Mode alternative background)
        metal: {
          base: '#0F0F0F',       // Fondo general (negro carbón) - Dark Mode BG
          accent: '#99C8E5',     // Azul hielo metalizado - Dark Mode Accent
          glow: '#4FD1C5',       // Cian eléctrico (hover, detalles) - Dark Mode Primary
          pulse: '#9C63E5',      // Púrpura iridiscente - Dark Mode Hover/Special Accent
          soft: '#D9DEE5',       // Gris claro metálico (textos) - Dark Mode Foreground
          chrome: '#5AF5A6',     // Verde cromo (acciones/estados) - WhatsApp Button
          steel: '#274D70',      // Azul acero profundo (estructura) - Dark Mode Secondary/Structural
        },
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			// Primary, Secondary, Muted, Accent for ShadCN theme variables will be set in globals.css
        // to use the new palette. We keep these HSL based definitions for ShadCN.
        // The direct primary/accent above are more for Tailwind class usage if needed outside ShadCN context.
        
        // ShadCN themed primary (will be mapped to metal.glow for dark, #2B405D for light)
  			'theme-primary': {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
        // ShadCN themed secondary (will be mapped to metal.steel for dark)
  			'theme-secondary': {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
        // ShadCN themed accent (will be mapped to metal.accent for dark, #A9BCCF for light)
  			'theme-accent': {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
        // Custom colors map to CSS variables
        // These were from a previous theme, might be overridden or adjusted by new globals.
        'custom-dark': 'hsl(var(--custom-dark))',
        'custom-contrast': 'hsl(var(--custom-contrast))',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
             '2xl': 'calc(var(--radius) + 4px)',
             'xl': 'calc(var(--radius) + 2px)',
  		},
        minHeight: {
            '60vh': '60vh',
            'screen': '100vh',
        },
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
