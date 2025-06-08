"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, UtensilsCrossed, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

const Logo = () => (
    <UtensilsCrossed className="h-10 w-10 text-primary dark:text-metal-accent" aria-hidden="true" />
);


const NavLinks = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <nav className={cn("flex flex-col md:flex-row md:items-center gap-4 md:gap-6 lg:gap-8", className)}>
    <Link href="#beneficios" onClick={onClick} className="text-sm font-medium text-foreground hover:text-primary dark:text-metal-soft dark:hover:text-metal-accent transition-colors" aria-label="Ir a la sección Beneficios">
      Beneficios
    </Link>
    <Link href="#como-funciona" onClick={onClick} className="text-sm font-medium text-foreground hover:text-primary dark:text-metal-soft dark:hover:text-metal-accent transition-colors" aria-label="Ir a la sección Cómo Funciona">
      Cómo Funciona
    </Link>
    <Link href="#paquetes" onClick={onClick} className="text-sm font-medium text-foreground hover:text-primary dark:text-metal-soft dark:hover:text-metal-accent transition-colors" aria-label="Ir a la sección Paquetes">
      Paquetes
    </Link>
    <Link href="#contacto" onClick={onClick} className="text-sm font-medium text-foreground hover:text-primary dark:text-metal-soft dark:hover:text-metal-accent transition-colors" aria-label="Ir a la sección Contacto">
      Contacto
    </Link>
  </nav>
);


export function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isSticky ? "bg-background/95 dark:bg-metal-base/95 shadow-md backdrop-blur-sm" : "bg-transparent dark:bg-metal-base/50" // Ensure dark mode bg even when not sticky if transparent
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-2 sm:px-4"> {/* Added px-2 for mobile, sm:px-4 for tablet+ */}
        <Link href="/" className="flex items-center gap-2 min-w-0" aria-label="TapMenu Inicio">
          <Logo />
          <span className="text-base sm:text-lg font-semibold text-foreground dark:text-metal-accent truncate max-w-[120px] sm:max-w-none">TapMenu</span> {/* Prevent overflow */}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
         <NavLinks />
          <Button asChild variant="default" size="default" rounded="2xl" className="ml-2 dark:bg-metal-glow dark:text-metal-base dark:hover:bg-metal-pulse">
            <Link href="/#contacto?paquete=starter" aria-label="Ver Paquetes desde cabecera">Ver Paquetes</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title="Cambiar tema"
            aria-label="Cambiar tema"
            className="ml-2 p-2 rounded-full hover:bg-accent/20 dark:text-metal-glow dark:hover:text-metal-pulse dark:hover:bg-transparent transition text-foreground"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title="Cambiar tema"
            aria-label="Cambiar tema"
            className="p-2 rounded-full hover:bg-accent/20 dark:text-metal-glow dark:hover:text-metal-pulse dark:hover:bg-transparent transition text-foreground"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú de navegación móvil">
                <Menu className="h-6 w-6 text-foreground dark:text-metal-soft" aria-hidden="true" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background dark:bg-metal-base w-[90vw] max-w-xs p-6"> {/* Responsive width and padding */}
              <div className="flex flex-col gap-6 mt-8">
                <NavLinks onClick={closeMobileMenu} className="gap-6 text-lg" />
                <Button asChild variant="default" size="lg" rounded="2xl" className="w-full dark:bg-metal-glow dark:text-metal-base dark:hover:bg-metal-pulse">
                  <Link href="/#contacto?paquete=starter" aria-label="Ver Paquetes desde menú móvil" onClick={closeMobileMenu}>Ver Paquetes</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
