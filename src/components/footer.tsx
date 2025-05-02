
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
import toast from 'react-hot-toast'; // Use react-hot-toast
import { Loader2, Send } from "lucide-react"; // Keep Send for potential future use, Loader2 for loading state (although not strictly needed now)
import { WhatsappIcon } from "@/components/icons/whatsapp-icon"; // Import WhatsApp icon
import { useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";

// Updated schema to include quantity, phone, city and use specific package IDs
// Ensure package enum matches the IDs used in Packages component ('starter', 'pyme', 'premium')
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }).max(50, { message: "El nombre no puede exceder los 50 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  phone: z.string().min(7, { message: "El teléfono debe tener al menos 7 dígitos." }).regex(/^\d+$/, { message: "El teléfono solo debe contener números." }), // Added phone validation
  city: z.string().min(2, { message: "La ciudad debe tener al menos 2 caracteres." }), // Added city validation
  restaurant: z.string().min(2, { message: "El nombre del restaurante debe tener al menos 2 caracteres." }).max(100, { message: "El nombre del restaurante no puede exceder los 100 caracteres." }),
  // Use specific package IDs and ensure they match <Packages/> component link params
  package: z.enum(['starter', 'pyme', 'premium'], {
     errorMap: () => ({ message: "Selecciona un paquete válido." })
   }),
  // Add quantity validation
  quantity: z.coerce // Use coerce for input type="number"
    .number({ invalid_type_error: "La cantidad debe ser un número." })
    .int({ message: "La cantidad debe ser un número entero." })
    .positive({ message: "La cantidad debe ser mayor que 0." }),
  message: z.string().max(500, { message: "El mensaje no puede exceder los 500 caracteres." }).optional(), // Made message optional and removed min length
});

type ContactFormSchema = z.infer<typeof contactFormSchema>;

// Use new package IDs consistent with schema and links
const availablePackages = [
  { id: 'starter', name: 'Starter' },
  { id: 'pyme', name: 'Pyme' },
  { id: 'premium', name: 'Premium' },
];

export function Footer() {
  // Removed isSubmitting state as we are opening WhatsApp directly
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null); // Ref for scrolling

  const selectedPackageFromUrl = searchParams?.get('paquete') || '';

  // Initialize form with zodResolver and defaultValues
  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "", // Added phone default
      city: "", // Added city default
      restaurant: "",
      // Pre-select package from URL if valid and exists in availablePackages
      package: availablePackages.find(p => p.id === selectedPackageFromUrl)?.id as 'starter' | 'pyme' | 'premium' | undefined,
      quantity: 1, // Default quantity to 1
      message: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  // Effect to update package based on URL params and scroll to contact section if hash is present
  useEffect(() => {
    const packageFromUrl = searchParams?.get('paquete');
    const validPackage = availablePackages.find(p => p.id === packageFromUrl);

    if (validPackage) {
        // Update the form value if the package from URL is valid
        form.setValue('package', validPackage.id as 'starter' | 'pyme' | 'premium', { shouldValidate: true });

        // Check if the hash indicates scrolling to the contact section
        if (formRef.current && window.location.hash === '#contacto') {
             // Delay scroll slightly to ensure layout is stable after potential package selection update
            setTimeout(() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100); // 100ms delay, adjust if needed
        }
    } else if (packageFromUrl) {
        // If URL param exists but is invalid, reset package field or handle as needed
         form.resetField('package', { defaultValue: undefined });
    }

    // Trigger validation after setting value based on URL
    form.trigger();

  }, [searchParams, form]); // Rerun when searchParams or form instance changes


  // Handle form submission: generate WhatsApp link and open it
  const onSubmit = (data: ContactFormSchema) => {
    // Destructure data including the new fields
    const { name, email, restaurant, phone, city, package: selectedPackageId, quantity, message = '' } = data;

    // Find package name for the message using the ID
    const selectedPackageName = availablePackages.find(p => p.id === selectedPackageId)?.name ?? selectedPackageId;

    // Construct the WhatsApp message template using template literals and ensure correct line breaks
    const rawMessage = `
¡Hola equipo de TapMenu! 👋

👤 Nombre: ${name}
🏷️ Restaurante: ${restaurant}
📍 Ciudad: ${city}
📱 Teléfono: ${phone}

📦 Paquete seleccionado: *${selectedPackageName}*
🔢 Cantidad de tarjetas: *${quantity}*

✉️ Email de contacto: ${email}

📝 Comentarios adicionales:
${message || '—'}

Quedo muy atento a los siguientes pasos. ¡Muchas gracias! 🙏
`.trim(); // trim() removes leading/trailing whitespace/newlines


    // Encode the entire message once
    const waUrl = `https://wa.me/573241083976?text=${encodeURIComponent(rawMessage)}`;


    // Show success toast before opening link
    toast.success('WhatsApp listo para enviar. ¡Redirigiendo!');

    // Open WhatsApp link in a new tab
    window.open(waUrl, '_blank');

    // Optionally reset the form after attempting to open WhatsApp
    // form.reset(); // Consider if resetting is desired UX
  };

  // Handle validation errors
  const onError = (errors: any) => {
     console.error("Form validation errors:", errors);
     // Check if there are errors before showing the toast
     if (Object.keys(errors).length > 0) {
        toast.error('Por favor completa todos los campos requeridos correctamente.');
     }
  };


  return (
     // Ensure the footer has the id="contacto" for scrolling
    <motion.footer
        id="contacto"
        className="bg-foreground text-background"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
    >
      <div className="container mx-auto py-16 md:py-24 grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ponte en Contacto</h2>
          <p className="text-muted max-w-md"> {/* Changed text-muted-foreground to text-muted */}
            ¿Listo para empezar? Completa el formulario y te contactaremos por WhatsApp para finalizar detalles.
          </p>
           {/* Removed Social Media Links Section */}
           <nav className="flex flex-wrap gap-x-6 gap-y-2">
             <Link href="/" className="text-sm text-muted hover:text-primary transition-colors" aria-label="Ir a Inicio">Inicio</Link>
             <Link href="#beneficios" className="text-sm text-muted hover:text-primary transition-colors" aria-label="Ir a Beneficios">Beneficios</Link>
             <Link href="#como-funciona" className="text-sm text-muted hover:text-primary transition-colors" aria-label="Ir a Cómo funciona">Cómo funciona</Link>
             <Link href="#paquetes" className="text-sm text-muted hover:text-primary transition-colors" aria-label="Ir a Paquetes">Paquetes</Link>
             <Link href="#contacto" className="text-sm text-muted hover:text-primary transition-colors" aria-label="Ir a Contacto">Contacto</Link>
           </nav>
        </div>

        {/* Contact Form - Updated onSubmit and onError */}
        <div className="space-y-6">
          <Form {...form}>
            {/* Pass onError handler to handleSubmit, attach ref to the form */}
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name" className="text-background">Nombre *</FormLabel>
                      <FormControl>
                        <Input id="name" aria-required="true" aria-label="Campo de entrada para nombre completo" placeholder="Tu nombre completo" {...field} className="bg-background text-foreground rounded-md"/>
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
                        <FormLabel htmlFor="email" className="text-background">Correo Electrónico *</FormLabel>
                        <FormControl>
                            <Input id="email" type="email" aria-required="true" aria-label="Campo de entrada para correo electrónico" placeholder="tu@email.com" {...field} className="bg-background text-foreground rounded-md"/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
              </div>

               {/* Added Phone and City Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="phone" className="text-background">Teléfono *</FormLabel>
                        <FormControl>
                          <Input id="phone" type="tel" aria-required="true" aria-label="Campo de entrada para número de teléfono" placeholder="Tu número de teléfono" {...field} className="bg-background text-foreground rounded-md"/>
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
                        <FormLabel htmlFor="city" className="text-background">Ciudad *</FormLabel>
                        <FormControl>
                          <Input id="city" aria-required="true" aria-label="Campo de entrada para ciudad" placeholder="Ciudad de tu restaurante" {...field} className="bg-background text-foreground rounded-md"/>
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
                    <FormLabel htmlFor="restaurant" className="text-background">Nombre del Restaurante *</FormLabel>
                    <FormControl>
                        <Input id="restaurant" aria-required="true" aria-label="Campo de entrada para nombre del restaurante" placeholder="Nombre de tu negocio" {...field} className="bg-background text-foreground rounded-md"/>
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
                        <FormLabel htmlFor="package" className="text-background">Paquete Deseado *</FormLabel>
                        {/* Use field.value directly. If it's undefined (e.g., initially or invalid URL param), SelectValue placeholder will show */}
                        <Select onValueChange={field.onChange} value={field.value} required>
                            <FormControl>
                            <SelectTrigger id="package" aria-required="true" aria-label="Selector de paquete deseado" className="bg-background text-foreground rounded-md">
                                {/* Show placeholder if field.value is null/undefined */}
                                <SelectValue placeholder="Selecciona un paquete" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {availablePackages.map((pkg) => (
                                <SelectItem key={pkg.id} value={pkg.id} aria-label={`Opción de paquete ${pkg.name}`}>
                                {pkg.name}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                {/* Quantity Field */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="quantity" className="text-background">Cantidad de Tarjetas *</FormLabel>
                      <FormControl>
                        <Input
                          id="quantity"
                          type="number"
                          min="1" // Ensure positive number in HTML validation as well
                          aria-required="true"
                          aria-label="Campo de entrada para cantidad de tarjetas NFC"
                          placeholder="Ej: 5"
                          {...field}
                          className="bg-background text-foreground rounded-md"
                          onChange={event => field.onChange(event.target.value === '' ? '' : Number(event.target.value))} // Handle empty input and ensure number type
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


               {/* Optional Message Field */}
               <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="message" className="text-background">Mensaje Adicional (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          id="message"
                          aria-label="Campo de texto para mensaje adicional"
                          placeholder="¿Alguna pregunta o detalle extra?"
                          {...field}
                          className="bg-background text-foreground rounded-md"
                          rows={3} // Reduced rows slightly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

             <motion.div
                whileHover={{ scale: 1.02 }} // Slightly reduce hover scale for WhatsApp button
                transition={{ type: "spring", stiffness: 400, damping: 17, ease: "easeInOut" }}
              >
                 {/* Updated Button */}
                 <Button
                   type="submit"
                   // Use formState.isDirty and formState.isValid for disabling the button
                   // Button is enabled only if the form is valid and has been touched/modified
                   disabled={!form.formState.isDirty || !form.formState.isValid}
                   aria-label="Enviar mensaje por WhatsApp"
                   // Apply btn-whatsapp class and other styles
                   className="w-full rounded-2xl btn-whatsapp flex items-center justify-center gap-2 p-3"
                  >
                    <WhatsappIcon className="w-6 h-6" aria-hidden="true" />
                    Enviar mensaje
                 </Button>
             </motion.div>
            </form>
          </Form>
        </div>
      </div>

      {/* Copyright - Update year */}
      <div className="border-t border-border/20 mt-12">
        <div className="container mx-auto py-6 text-center text-sm text-muted"> {/* Changed text-muted-foreground to text-muted */}
          © 2025 TapMenu. Todos los derechos reservados.
        </div>
      </div>
    </motion.footer>
  );
}
