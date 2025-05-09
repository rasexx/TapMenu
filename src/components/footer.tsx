
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import toast from 'react-hot-toast';
import { Loader2 } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }).max(50, { message: "El nombre no puede exceder los 50 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  phone: z.string().min(7, { message: "El teléfono debe tener al menos 7 dígitos." }).regex(/^\d+$/, { message: "El teléfono solo debe contener números." }),
  city: z.string().min(2, { message: "La ciudad debe tener al menos 2 caracteres." }),
  restaurant: z.string().min(2, { message: "El nombre del restaurante debe tener al menos 2 caracteres." }).max(100, { message: "El nombre del restaurante no puede exceder los 100 caracteres." }),
  package: z.enum(['starter', 'pyme', 'premium'], {
     errorMap: () => ({ message: "Selecciona un paquete válido." })
   }),
  quantity: z.coerce
    .number({ invalid_type_error: "La cantidad debe ser un número." })
    .int({ message: "La cantidad debe ser un número entero." })
    .positive({ message: "La cantidad debe ser mayor que 0." }),
  message: z.string().max(500, { message: "El mensaje no puede exceder los 500 caracteres." }).optional(),
});

type ContactFormSchema = z.infer<typeof contactFormSchema>;

const availablePackages = [
  { id: 'starter', name: 'Starter' },
  { id: 'pyme', name: 'Pyme' },
  { id: 'premium', name: 'Premium' },
];

export function Footer() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const footerRef = useRef<HTMLElement>(null); 

  const selectedPackageFromUrl = searchParams?.get('paquete') || '';

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      restaurant: "",
      package: availablePackages.find(p => p.id === selectedPackageFromUrl)?.id as 'starter' | 'pyme' | 'premium' | undefined,
      quantity: 1,
      message: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const packageFromUrl = searchParams?.get('paquete');
    const validPackage = availablePackages.find(p => p.id === packageFromUrl);
    let shouldScroll = false;

    if (validPackage) {
        form.setValue('package', validPackage.id as 'starter' | 'pyme' | 'premium', { shouldValidate: false, shouldDirty: true, shouldTouch: true });
        shouldScroll = true;
    } else if (packageFromUrl) {
         form.resetField('package', { defaultValue: undefined });
    }

    if (shouldScroll && footerRef.current) {
        setTimeout(() => {
            footerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  }, [searchParams, form]);


  const onSubmit = (data: ContactFormSchema) => {
    const { name, email, restaurant, phone, city, package: selectedPackageId, quantity, message = '' } = data;
    const selectedPackageName = availablePackages.find(p => p.id === selectedPackageId)?.name ?? selectedPackageId;

    const rawMessage = `
Hola equipo de TapMenu,

Nombre: ${name}
Restaurante: ${restaurant}
Ciudad: ${city}
Teléfono: ${phone}

Paquete seleccionado: ${selectedPackageName}
Cantidad de tarjetas: ${quantity}

Email de contacto: ${email}

Comentarios adicionales:
${message || 'Ninguno'}

Quedo atento a los siguientes pasos. Gracias.
`.trim();

    const waUrl = `https://wa.me/573241083976?text=${encodeURIComponent(rawMessage)}`;
    toast.success('WhatsApp listo para enviar. ¡Redirigiendo!');
    window.open(waUrl, '_blank');
  };

  const onError = (errors: any) => {
     console.error("Form validation errors:", errors);
     if (Object.keys(errors).length > 0) {
        if (form.formState.isSubmitted) {
           toast.error('Por favor completa todos los campos requeridos correctamente.');
        }
     }
  };

  return (
    <motion.footer
        id="contacto" 
        ref={footerRef}
        className="bg-custom-dark dark:bg-metal-base text-custom-contrast dark:text-metal-soft"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
    >
      <div className="container mx-auto py-16 md:py-24 grid md:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-custom-contrast dark:text-metal-soft">Ponte en Contacto</h2>
          <p className="text-custom-contrast/80 dark:text-metal-soft/80 max-w-md">
            ¿Listo para empezar? Completa el formulario y te contactaremos por WhatsApp para finalizar detalles.
          </p>
           <nav className="flex flex-wrap gap-x-6 gap-y-2">
             <Link href="/" className="text-sm text-custom-contrast dark:text-metal-soft hover:text-accent dark:hover:text-metal-glow transition-colors" aria-label="Ir a Inicio">Inicio</Link>
             <Link href="#beneficios" className="text-sm text-custom-contrast dark:text-metal-soft hover:text-accent dark:hover:text-metal-glow transition-colors" aria-label="Ir a Beneficios">Beneficios</Link>
             <Link href="#como-funciona" className="text-sm text-custom-contrast dark:text-metal-soft hover:text-accent dark:hover:text-metal-glow transition-colors" aria-label="Ir a Cómo funciona">Cómo funciona</Link>
             <Link href="#paquetes" className="text-sm text-custom-contrast dark:text-metal-soft hover:text-accent dark:hover:text-metal-glow transition-colors" aria-label="Ir a Paquetes">Paquetes</Link>
             <Link href="#contacto" className="text-sm text-custom-contrast dark:text-metal-soft hover:text-accent dark:hover:text-metal-glow transition-colors" aria-label="Ir a Contacto">Contacto</Link>
           </nav>
        </div>

        <div className="space-y-6">
          <Form {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name" className="text-custom-contrast dark:text-metal-soft">Nombre *</FormLabel>
                      <FormControl>
                        <Input id="name" aria-required="true" aria-label="Campo de entrada para nombre completo" placeholder="Tu nombre completo" {...field} className="bg-custom-contrast dark:bg-metal-base text-foreground dark:text-metal-soft border-input dark:border-metal-accent rounded-md"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel htmlFor="email" className="text-custom-contrast dark:text-metal-soft">Correo Electrónico *</FormLabel>
                        <FormControl>
                            <Input id="email" type="email" aria-required="true" aria-label="Campo de entrada para correo electrónico" placeholder="tu@email.com" {...field} className="bg-custom-contrast dark:bg-metal-base text-foreground dark:text-metal-soft border-input dark:border-metal-accent rounded-md"/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
              </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="phone" className="text-custom-contrast dark:text-metal-soft">Teléfono *</FormLabel>
                        <FormControl>
                          <Input id="phone" type="tel" aria-required="true" aria-label="Campo de entrada para número de teléfono" placeholder="Tu número de teléfono" {...field} className="bg-custom-contrast dark:bg-metal-base text-foreground dark:text-metal-soft border-input dark:border-metal-accent rounded-md"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="city" className="text-custom-contrast dark:text-metal-soft">Ciudad *</FormLabel>
                        <FormControl>
                          <Input id="city" aria-required="true" aria-label="Campo de entrada para ciudad" placeholder="Ciudad de tu restaurante" {...field} className="bg-custom-contrast dark:bg-metal-base text-foreground dark:text-metal-soft border-input dark:border-metal-accent rounded-md"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

               <FormField
                control={form.control}
                name="restaurant"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel htmlFor="restaurant" className="text-custom-contrast dark:text-metal-soft">Nombre del Restaurante *</FormLabel>
                    <FormControl>
                        <Input id="restaurant" aria-required="true" aria-label="Campo de entrada para nombre del restaurante" placeholder="Nombre de tu negocio" {...field} className="bg-custom-contrast dark:bg-metal-base text-foreground dark:text-metal-soft border-input dark:border-metal-accent rounded-md"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="package"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel htmlFor="package" className="text-custom-contrast dark:text-metal-soft">Paquete Deseado *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} required>
                            <FormControl>
                            <SelectTrigger id="package" aria-required="true" aria-label="Selector de paquete deseado" className="bg-custom-contrast dark:bg-metal-base text-foreground dark:text-metal-soft border-input dark:border-metal-accent rounded-md">
                                <SelectValue placeholder="Selecciona un paquete" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent className="dark:bg-metal-steel dark:text-metal-soft dark:border-metal-accent">
                            {availablePackages.map((pkg) => (
                                <SelectItem key={pkg.id} value={pkg.id} aria-label={`Opción de paquete ${pkg.name}`} className="dark:focus:bg-metal-pulse">
                                {pkg.name}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="quantity" className="text-custom-contrast dark:text-metal-soft">Cantidad de Tarjetas *</FormLabel>
                      <FormControl>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          aria-required="true"
                          aria-label="Campo de entrada para cantidad de tarjetas NFC"
                          placeholder="Ej: 5"
                          {...field}
                          className="bg-custom-contrast dark:bg-metal-base text-foreground dark:text-metal-soft border-input dark:border-metal-accent rounded-md"
                          onChange={event => field.onChange(event.target.value === '' ? '' : Number(event.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="message" className="text-custom-contrast dark:text-metal-soft">Mensaje Adicional (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          id="message"
                          aria-label="Campo de texto para mensaje adicional"
                          placeholder="¿Alguna pregunta o detalle extra?"
                          {...field}
                          className="bg-custom-contrast dark:bg-metal-base text-foreground dark:text-metal-soft border-input dark:border-metal-accent rounded-md" 
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

             <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17, ease: "easeInOut" }}
              >
                 <Button
                   type="submit"
                   disabled={form.formState.isSubmitting || (form.formState.isSubmitted && !form.formState.isValid)}
                   aria-label="Enviar mensaje por WhatsApp"
                   className="w-full rounded-2xl btn-whatsapp flex items-center justify-center gap-2 p-3" // btn-whatsapp already styled in globals.css
                  >
                    {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : <WhatsappIcon className="w-6 h-6" aria-hidden="true" />}
                    Enviar mensaje
                 </Button>
             </motion.div>
            </form>
          </Form>
        </div>
      </div>

      <div className="border-t border-custom-contrast/20 dark:border-metal-soft/20 mt-12 py-6 text-center text-xs text-custom-contrast/70 dark:text-metal-soft/70 space-y-2">
        © 2025 TapMenu. Todos los derechos reservados.<br />
        Diseñado con ❤️ para la industria gastronómica.<br />
        Creado y mantenido por{' '}
        <a
          href="https://linktr.ee/jseramn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent dark:text-metal-glow hover:text-accent/80 dark:hover:text-metal-pulse hover:underline"
          aria-label="Visitar perfil de José Ramón en Linktree"
        >
          José Ramón
        </a>
      </div>
    </motion.footer>
  );
}
