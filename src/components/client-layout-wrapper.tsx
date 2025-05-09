
'use client';

import type { FC, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import { Toaster as ShadToaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from 'react-hot-toast';
import CardLoader from '@/components/ui/CardLoader';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: "--font-sans" });

interface ClientLayoutWrapperProps {
  children: ReactNode;
}

const ClientLayoutWrapper: FC<ClientLayoutWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []);

  // Initialize theme
  useEffect(() => {
    const root = window.document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark'); // default to dark if no theme or 'dark'
      if (!storedTheme) {
        localStorage.setItem('theme', 'dark');
      }
    }
  }, []);

  return (
    <body
      className={cn(
        "min-h-screen bg-background text-foreground font-sans antialiased",
        "dark:bg-metal-base dark:text-metal-soft",
        inter.variable
      )}
    >
      <CardLoader isLoading={isLoading} />
      {!isLoading && children}
      <ShadToaster />
      <HotToaster />
    </body>
  );
};

export default ClientLayoutWrapper;
