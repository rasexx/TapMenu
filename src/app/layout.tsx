import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster as ShadToaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from 'react-hot-toast';
import { cn } from '@/lib/utils';

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
    // url: "YOUR_APP_URL", // Replace with your actual URL
    images: [
      {
        url: "/og-image.png", // Ensure this image exists in /public
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
    images: ["/og-image.png"], // Ensure this image exists in /public
    // creator: "@your_twitter_handle", // Replace with your Twitter handle
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" }, // White for light theme
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },  // Very Dark Gray for dark theme
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
       <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {children}
        <ShadToaster />
        <HotToaster />
      </body>
    </html>
  );
}
