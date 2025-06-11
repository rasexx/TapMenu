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
   }).optional(), // Make package optional initially, will be validated if selected or prefilled
  quantity: z.coerce
    .number({ invalid_type_error: "La cantidad debe ser un número." })
    .int({ message: "La cantidad debe ser un número entero." })
    .positive({ message: "La cantidad debe ser mayor que 0." }),
  message: z.string().max(500, { message: "El mensaje no puede exceder los 500 caracteres." }).optional(),
}).refine(data => data.package !== undefined, { // Custom validation to ensure package is selected
    message: "Debes seleccionar un paquete.",
    path: ["package"], // Specify the path of the error
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
  const footerRef = useRef<HTMLElement>(null); // Ref for the footer section

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
    mode: "onBlur", // Validate on blur
    reValidateMode: "onChange", // Re-validate on change after first blur
  });

  // Effect to handle prefilling and scrolling when URL param changes
  useEffect(() => {
    const packageFromUrl = searchParams?.get('paquete');
    const validPackage = availablePackages.find(p => p.id === packageFromUrl);
    let shouldScroll = false;

    if (validPackage) {
        // Prefill the form field if a valid package is in the URL
        form.setValue('package', validPackage.id as 'starter' | 'pyme' | 'premium', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
        shouldScroll = true; // Mark that we should scroll
    } else if (packageFromUrl) {
        // If the param exists but is invalid, reset the field
        form.resetField('package');
    }

    // Scroll to the contact section if needed, after a short delay to allow rendering
    if (shouldScroll && footerRef.current) {
        setTimeout(() => {
            footerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // Delay helps ensure the element is ready
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [searchParams, form.setValue, form.resetField]); // form reference is stable, add specific methods


  const onSubmit = (data: ContactFormSchema) => {
    const { name, email, restaurant, phone, city, package: selectedPackageId, quantity, message = '' } = data;
    // Ensure selectedPackageId is not undefined before proceeding
     if (!selectedPackageId) {
        toast.error('Por favor, selecciona un paquete.');
        // Focus the package field if possible
        form.setFocus('package');
        return;
     }
    const selectedPackageName = availablePackages.find(p => p.id === selectedPackageId)?.name ?? selectedPackageId;

    const rawMessage = `
Hola equipo de TagMe,

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

  // onError is called when form validation fails
  const onError = (errors: any) => {
     console.error("Form validation errors:", errors);
     // Only show toast if the form has been submitted at least once
     if (form.formState.isSubmitted) {
        toast.error('Por favor completa todos los campos requeridos correctamente.');
     }
  };


  return (
    <motion.footer
        id="contact-section" // Changed ID to contact-section for scroll target
        ref={footerRef}
        className="bg-dark dark:bg-metal-base text-contrast dark:text-metal-soft py-8 md:py-16" // Applied new palette, adjusted padding
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 grid md:grid-cols-2 gap-12 lg:gap-16"> {/* Added container padding */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight sm:text-4xl text-contrast dark:text-metal-soft">Ponte en Contacto</h2> {/* Adjusted heading size */}
          <p className="text-contrast/80 dark:text-metal-soft/80 max-w-md leading-relaxed">
            ¿Listo para empezar? Completa el formulario y te contactaremos por WhatsApp para finalizar detalles.
          </p>
           <nav className="flex flex-wrap gap-x-6 gap-y-2">
             <Link href="/" className="text-sm text-contrast dark:text-metal-soft hover:text-accent dark:hover:text-metal-glow transition-colors" aria-label="Ir a Inicio">Inicio</Link>
             <Link href="#beneficios" className="text-sm text-contrast dark:text-metal-soft hover:text-accent dark:hover:text-metal-glow transition-colors" aria-label="Ir a Beneficios">Beneficios</Link>
             <Link href="#como-funciona" className="text-sm text-contrast dark:text-metal-soft hover:text-accent dark:hover:text-metal-glow transition-colors" aria-label="Ir a Cómo funciona">Cómo funciona</Link>
             <Link href="#paquetes" className="text-sm text-contrast dark:text-metal-soft hover:text-accent dark:hover:text-metal-glow transition-colors" aria-label="Ir a Paquetes">Paquetes</Link>
             <Link href="#contact-section" className="text-sm text-contrast dark:text-metal-soft hover:text-accent dark:hover:text-metal-glow transition-colors" aria-label="Ir a Contacto">Contacto</Link> {/* Updated href */}
           </nav>
        </div>

        <div className="space-y-6">
          <Form {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name" className="text-contrast dark:text-metal-soft">Nombre *</FormLabel>
                      <FormControl>
                        <Input id="name" aria-required="true" aria-label="Campo de entrada para nombre completo" placeholder="Tu nombre completo" {...field} className="bg-contrast text-dark dark:bg-metal-base dark:text-metal-soft border-input dark:border-metal-accent rounded-md"/>
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
                        <FormLabel htmlFor="email" className="text-contrast dark:text-metal-soft">Correo Electrónico *</FormLabel>
                        <FormControl>
                            <Input id="email" type="email" aria-required="true" aria-label="Campo de entrada para correo electrónico" placeholder="tu@email.com" {...field} className="bg-contrast text-dark dark:bg-metal-base dark:text-metal-soft border-input dark:border-metal-accent rounded-md"/>
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
                        <FormLabel htmlFor="phone" className="text-contrast dark:text-metal-soft">Teléfono *</FormLabel>
                        <FormControl>
                          <Input id="phone" type="tel" aria-required="true" aria-label="Campo de entrada para número de teléfono" placeholder="Tu número de teléfono" {...field} className="bg-contrast text-dark dark:bg-metal-base dark:text-metal-soft border-input dark:border-metal-accent rounded-md"/>
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
                        <FormLabel htmlFor="city" className="text-contrast dark:text-metal-soft">Ciudad *</FormLabel>
                        <FormControl>
                          <Input id="city" aria-required="true" aria-label="Campo de entrada para ciudad" placeholder="Ciudad de tu restaurante" {...field} className="bg-contrast text-dark dark:bg-metal-base dark:text-metal-soft border-input dark:border-metal-accent rounded-md"/>
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
                    <FormLabel htmlFor="restaurant" className="text-contrast dark:text-metal-soft">Nombre del Restaurante *</FormLabel>
                    <FormControl>
                        <Input id="restaurant" aria-required="true" aria-label="Campo de entrada para nombre del restaurante" placeholder="Nombre de tu negocio" {...field} className="bg-contrast text-dark dark:bg-metal-base dark:text-metal-soft border-input dark:border-metal-accent rounded-md"/>
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
                        <FormLabel htmlFor="package" className="text-contrast dark:text-metal-soft">Paquete Deseado *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} > {/* Removed required as Zod handles it */}
                            <FormControl>
                            <SelectTrigger id="package" aria-required="true" aria-label="Selector de paquete deseado" className="bg-contrast text-dark dark:bg-metal-base dark:text-metal-soft border-input dark:border-metal-accent rounded-md">
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
                      <FormLabel htmlFor="quantity" className="text-contrast dark:text-metal-soft">Cantidad de Tarjetas *</FormLabel>
                      <FormControl>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          aria-required="true"
                          aria-label="Campo de entrada para cantidad de tarjetas NFC"
                          placeholder="Ej: 5"
                          {...field}
                          className="bg-contrast text-dark dark:bg-metal-base dark:text-metal-soft border-input dark:border-metal-accent rounded-md"
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
                      <FormLabel htmlFor="message" className="text-contrast dark:text-metal-soft">Mensaje Adicional (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          id="message"
                          aria-label="Campo de texto para mensaje adicional"
                          placeholder="¿Alguna pregunta o detalle extra?"
                          {...field}
                          className="bg-contrast text-dark dark:bg-metal-base dark:text-metal-soft border-input dark:border-metal-accent rounded-md"
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
                   disabled={form.formState.isSubmitting} // Disable only during submission
                   aria-label="Enviar mensaje por WhatsApp"
                   className="w-full rounded-2xl btn-whatsapp flex items-center justify-center gap-2 p-3" // Using WhatsApp button style from globals
                  >
                    {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : <WhatsappIcon className="w-6 h-6" aria-hidden="true" />}
                    Enviar mensaje
                 </Button>
             </motion.div>
            </form>
          </Form>
        </div>
      </div>

      {/* Credits Section */}
      <div className="border-t border-contrast/20 dark:border-metal-soft/20 mt-12 py-6 text-center text-xs text-contrast/70 dark:text-metal-soft/70 space-y-2">
        © 2025 TagMe. Todos los derechos reservados.<br />
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
