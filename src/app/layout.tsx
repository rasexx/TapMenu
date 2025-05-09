
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster as ShadToaster } from "@/components/ui/toaster"; // Renamed to avoid conflict
import { Toaster as HotToaster } from 'react-hot-toast'; // Import react-hot-toast
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: "--font-sans" });

const APP_NAME = "TapMenu";
const APP_DEFAULT_TITLE = "TapMenu - Menú Digital NFC Instantáneo";
const APP_TITLE_TEMPLATE = "%s | TapMenu";
// Updated description meta tag
const APP_DESCRIPTION = "TapMenu: menús digitales NFC. Acceso instantáneo con un solo tap. Paquetes Starter, Pyme y Premium.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json", // Assuming manifest exists or will be added
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
    images: [ // Keep OG image
      {
        url: "/og-image.png", // Assuming image is in public folder
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
    images: ["/og-image.png"], // Assuming same image for Twitter
    // creator: "@your_twitter_handle", // Replace with your Twitter handle
  },
};

export const viewport: Viewport = {
  themeColor: [ // Provide theme colors for light and dark mode
    { media: "(prefers-color-scheme: light)", color: "#E1ECF4" }, // Light theme background
    { media: "(prefers-color-scheme: dark)", color: "#1C1C1C" },  // Dark theme background
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
        <ShadToaster /> {/* ShadCN Toaster */}
        <HotToaster /> {/* React Hot Toast Toaster */}
      </body>
    </html>
  );
}
