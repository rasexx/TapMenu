
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="h-8 w-auto text-primary"
    fill="currentColor"
  >
    <path d="M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10zm0 70c-16.6 0-30-13.4-30-30S33.4 20 50 20s30 13.4 30 30-13.4 30-30 30z"/>
    <path d="M50 35c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm0 20c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
  </svg>
);

const NavLinks = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <nav className={cn("flex flex-col md:flex-row md:items-center gap-4 md:gap-6 lg:gap-8", className)}>
    <Link href="#beneficios" onClick={onClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
      Beneficios
    </Link>
    <Link href="#como-funciona" onClick={onClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
      Cómo Funciona
    </Link>
    <Link href="#paquetes" onClick={onClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
      Paquetes
    </Link>
    <Link href="#contacto" onClick={onClick} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
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
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
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
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-foreground" />
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
                 <Button asChild className="mt-4">
                     <Link href="#paquetes" onClick={closeMobileMenu}>Ver Paquetes</Link>
                 </Button>
               </div>
            </SheetContent>
          </Sheet>
        </div>
         <Button asChild className="hidden md:inline-flex">
            <Link href="#paquetes">Ver Paquetes</Link>
          </Button>
      </div>
    </header>
  );
}
