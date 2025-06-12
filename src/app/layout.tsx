import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from '@/components/client-layout-wrapper';

// Importar solo los pesos necesarios de Inter
const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '800'], variable: "--font-sans" });

const APP_NAME = "TagMe";
const APP_DEFAULT_TITLE = "TagMe – Tu tarjeta NFC para networking profesional";
const APP_TITLE_TEMPLATE = "%s | TagMe";
const APP_DESCRIPTION = "Conecta con un solo toque. TagMe es la forma moderna de compartir tu contacto, portafolio o marca personal con tecnología NFC.";
const APP_URL = "https://tagme.app/";
const APP_IMAGE = "/og-image.png"; // Asegúrate de tener esta imagen en public/

export const metadata: Metadata = {
  metadataBase: new URL("https://tagme.app/"),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    url: APP_URL,    images: [
      {
        url: APP_IMAGE,
        width: 1200,
        height: 630,
        alt: "TagMe – Tarjeta NFC para networking",
      },
    ],
    url: APP_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    images: [APP_IMAGE],
    site: "@tagmeapp", // Cambia por el usuario real si existe
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" }, 
    { media: "(prefers-color-scheme: dark)", color: "#0F0F0F" },
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preconnect y preload para Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
    </html>
  );
}
