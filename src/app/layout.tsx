import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: "--font-sans" });

const APP_NAME = "TapMenu";
const APP_DEFAULT_TITLE = "TapMenu - Menú Digital NFC Instantáneo";
const APP_TITLE_TEMPLATE = "%s | TapMenu";
const APP_DESCRIPTION = "Crea y actualiza tu menú digital al instante con tecnología NFC. Rápido, seguro y personalizable.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json", // Assuming you might add a manifest later
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [], // Add startup images if needed
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
    // images: [
    //   {
    //     url: "YOUR_OG_IMAGE_URL", // Replace with your OG image URL
    //     width: 1200,
    //     height: 630,
    //     alt: "TapMenu Open Graph Image",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    // images: ["YOUR_TWITTER_IMAGE_URL"], // Replace with your Twitter image URL
    // creator: "@your_twitter_handle", // Replace with your Twitter handle
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF", // Primary color (White)
  // width: "device-width", // Default
  // initialScale: 1, // Default
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
        <Toaster />
      </body>
    </html>
  );
}
