"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { FiWifi } from "react-icons/fi";

const Logo = () => (
  <FiWifi
    className="h-8 w-8 md:h-10 md:w-10 text-[#003D73] dark:text-[#64FFB3] transition-colors"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    title="TagMe – Tarjeta NFC para networking"
  />
);

const NavLinks = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <nav className={cn("flex flex-col md:flex-row md:items-center gap-4 md:gap-6 lg:gap-8", className)} role="navigation" aria-label="Navegación principal">
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
        isSticky
          ? "bg-[#E4E9EC]/95 dark:bg-[#0A1929]/95 shadow-md backdrop-blur-sm"
          : "bg-[#E4E9EC] dark:bg-[#0A1929]"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 gap-2">
        <Link href="/" className="flex items-center gap-2 min-w-0" aria-label="TagMe Inicio">
          <Logo />
          <span className="text-lg font-semibold text-[#003D73] dark:text-[#64FFB3] truncate">TagMe</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
         <NavLinks />
          <Button asChild variant="default" size="default" rounded="2xl" className="ml-2 bg-[#003D73] text-white hover:bg-[#64FFB3] hover:text-[#003D73] focus:ring-2 focus:ring-[#003D73] dark:bg-[#64FFB3] dark:text-[#003D73] dark:hover:bg-[#003D73] dark:hover:text-[#64FFB3]">
            <Link href="/#contacto?paquete=starter" aria-label="Ver Paquetes desde cabecera">Ver Paquetes</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title="Cambiar tema"
            aria-label="Cambiar entre modo claro y oscuro"
            className="ml-2 p-2 rounded-full hover:bg-[#64FFB3]/20 dark:text-[#64FFB3] dark:hover:text-[#003D73] dark:hover:bg-[#003D73]/20 transition text-[#003D73]"
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
            aria-label="Cambiar entre modo claro y oscuro"
            className="p-2 rounded-full hover:bg-[#64FFB3]/20 dark:text-[#64FFB3] dark:hover:text-[#003D73] dark:hover:bg-[#003D73]/20 transition text-[#003D73]"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú de navegación móvil" className="text-[#003D73] dark:text-[#64FFB3]">
                <Menu className="h-6 w-6" aria-hidden="true" role="presentation" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#E4E9EC] dark:bg-[#0A1929]">
               <div className="flex flex-col gap-6 p-6">
                 <Link href="/" className="flex items-center gap-2 mb-4" onClick={closeMobileMenu} aria-label="TagMe Inicio">
                    <Logo />
                    <span className="text-lg font-semibold text-[#003D73] dark:text-[#64FFB3]">TagMe</span>
                </Link>
                <NavLinks className="items-start" onClick={closeMobileMenu} />
                 <Button asChild variant="default" size="default" rounded="2xl" className="mt-4 bg-[#003D73] text-white hover:bg-[#64FFB3] hover:text-[#003D73] focus:ring-2 focus:ring-[#003D73] dark:bg-[#64FFB3] dark:text-[#003D73] dark:hover:bg-[#003D73] dark:hover:text-[#64FFB3]">
                     <Link href="/#contacto?paquete=starter" onClick={closeMobileMenu} aria-label="Ver Paquetes desde menú móvil">Ver Paquetes</Link>
                 </Button>
               </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
