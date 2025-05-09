
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from '@/components/client-layout-wrapper';

const inter = Inter({ subsets: ['latin'], variable: "--font-sans" });

const APP_NAME = "TapMenu";
const APP_DEFAULT_TITLE = "TapMenu - Menú Digital NFC Instantáneo";
const APP_TITLE_TEMPLATE = "%s | TapMenu";
const APP_DESCRIPTION = "TapMenu: menús digitales NFC. Acceso instantáneo con un solo tap. Paquetes Starter, Pyme y Premium.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
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
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "TapMenu Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: ["/og-image.png"],
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
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
    </html>
  );
}
