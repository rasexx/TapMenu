
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

// Logo Component using Next/Image
const Logo = () => (
    <Image
        src="/logo.svg" // Path to the logo in the public folder
        alt="TapMenu Logo"
        width={32} // Set desired width (adjust as needed)
        height={32} // Set desired height (adjust as needed)
        className="h-8 w-auto" // Use Tailwind for height, width auto
        priority // Prioritize loading the logo
    />
);


const NavLinks = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <nav className={cn("flex flex-col md:flex-row md:items-center gap-4 md:gap-6 lg:gap-8", className)}>
    <Link href="#beneficios" onClick={onClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors" aria-label="Ir a la sección Beneficios">
      Beneficios
    </Link>
    <Link href="#como-funciona" onClick={onClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors" aria-label="Ir a la sección Cómo Funciona">
      Cómo Funciona
    </Link>
    <Link href="#paquetes" onClick={onClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors" aria-label="Ir a la sección Paquetes">
      Paquetes
    </Link>
    <Link href="#contacto" onClick={onClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors" aria-label="Ir a la sección Contacto">
      Contacto
    </Link>
  </nav>
);


export function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        isSticky ? "bg-background/95 shadow-md backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between"> {/* Use container padding */}
        <Link href="/" className="flex items-center gap-2" aria-label="TapMenu Inicio">
          <Logo />
          <span className="text-lg font-semibold text-foreground">TapMenu</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
         <NavLinks />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú de navegación móvil">
                <Menu className="h-6 w-6 text-foreground" aria-hidden="true" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
               <div className="flex flex-col gap-6 p-6">
                 <Link href="/" className="flex items-center gap-2 mb-4" onClick={closeMobileMenu} aria-label="TapMenu Inicio">
                    <Logo />
                    <span className="text-lg font-semibold text-foreground">TapMenu</span>
                </Link>
                <NavLinks className="items-start" onClick={closeMobileMenu} />
                 <Button asChild className="mt-4 rounded-2xl">
                     <Link href="#paquetes" onClick={closeMobileMenu} aria-label="Ver Paquetes desde menú móvil">Ver Paquetes</Link>
                 </Button>
               </div>
            </SheetContent>
          </Sheet>
        </div>
         <Button asChild className="hidden md:inline-flex rounded-2xl">
            <Link href="#paquetes" aria-label="Ver Paquetes desde cabecera">Ver Paquetes</Link>
          </Button>
      </div>
    </header>
  );
}
