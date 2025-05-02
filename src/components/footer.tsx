
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"; // Keep label if used by Form
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import toast from 'react-hot-toast'; // Use react-hot-toast
import { Loader2, Send } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";

// Mock function - replace with actual Firebase function call
const sendContactForm = async (data: ContactFormSchema) => {
  console.log("Sending form data:", data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate success/failure
  const success = true; // Always succeed for demo
  if (success) {
    // Assuming your Cloud Function returns a success message
    return { success: true, message: "Mensaje enviado con éxito. ¡Pronto nos pondremos en contacto!" };
  } else {
    throw new Error("Hubo un problema al enviar el mensaje. Inténtalo de nuevo más tarde.");
  }
};


const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }).max(50, { message: "El nombre no puede exceder los 50 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  restaurant: z.string().min(2, { message: "El nombre del restaurante debe tener al menos 2 caracteres." }).max(100, { message: "El nombre del restaurante no puede exceder los 100 caracteres." }),
  // Update package enum to match new package IDs
  package: z.enum(['starter', 'pyme', 'premium', 'no-estoy-seguro'], {
     errorMap: () => ({ message: "Selecciona un paquete válido." })
   }).optional(),
  // quantity: z.number({ invalid_type_error: "La cantidad debe ser un número." }).int({ message: "La cantidad debe ser un número entero." }).positive({ message: "La cantidad debe ser mayor que 0." }).optional(), // Quantity validation removed as per latest package structure
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }).max(500, { message: "El mensaje no puede exceder los 500 caracteres." }).optional(),
});

type ContactFormSchema = z.infer<typeof contactFormSchema>;

// Use new package IDs
const availablePackages = [
  { id: 'starter', name: 'Starter' },
  { id: 'pyme', name: 'Pyme' },
  { id: 'premium', name: 'Premium' },
];

export function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const selectedPackageFromUrl = searchParams?.get('paquete') || '';

  // Update package type in defaultValues
  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      restaurant: "",
      package: availablePackages.some(p => p.id === selectedPackageFromUrl) ? selectedPackageFromUrl as 'starter' | 'pyme' | 'premium' | 'no-estoy-seguro' : undefined,
      message: "",
    },
     mode: "onChange", // Validate on change for better UX
  });

   // Update package type in useEffect
  useEffect(() => {
    const packageFromUrl = searchParams?.get('paquete');
    const validPackage = availablePackages.find(p => p.id === packageFromUrl);
    if (validPackage) {
        form.setValue('package', validPackage.id as 'starter' | 'pyme' | 'premium', { shouldValidate: true });
        if (formRef.current && window.location.hash.startsWith('#contacto')) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else if (packageFromUrl === 'no-estoy-seguro') {
         form.setValue('package', 'no-estoy-seguro', { shouldValidate: true });
         if (formRef.current && window.location.hash.startsWith('#contacto')) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
  }, [searchParams, form]);


  const onSubmit = async (data: ContactFormSchema) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Enviando mensaje...'); // Loading toast

    try {
      const result = await sendContactForm(data);
      toast.success(result.message, { id: toastId }); // Success toast
      form.reset();
      // Reset package correctly after submission, matching useEffect logic
      const packageFromUrl = searchParams?.get('paquete');
      const validPackage = availablePackages.find(p => p.id === packageFromUrl);
       if (validPackage) {
           form.setValue('package', validPackage.id as 'starter' | 'pyme' | 'premium');
       } else if (packageFromUrl === 'no-estoy-seguro') {
           form.setValue('package', 'no-estoy-seguro');
       } else {
           form.setValue('package', undefined); // Clear if no valid URL param
       }

    } catch (error: any) {
      toast.error(error.message || "No se pudo enviar el formulario.", { id: toastId }); // Error toast
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
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
          <p className="text-muted max-w-md"> {/* Changed text-muted-foreground to text-muted for better contrast */}
            ¿Tienes preguntas o estás listo para empezar? Rellena el formulario o contáctanos directamente.
          </p>
           {/* Removed Social Media Links Section */}
          {/* <div className="flex space-x-4"> ... removed ... </div> */}
           {/* Add internal navigation links if needed, or remove this div */}
           <nav className="flex flex-wrap gap-x-6 gap-y-2">
             <Link href="/" className="text-sm text-muted hover:text-primary transition-colors" aria-label="Ir a Inicio">Inicio</Link>
             <Link href="#beneficios" className="text-sm text-muted hover:text-primary transition-colors" aria-label="Ir a Beneficios">Beneficios</Link>
             <Link href="#como-funciona" className="text-sm text-muted hover:text-primary transition-colors" aria-label="Ir a Cómo funciona">Cómo funciona</Link>
             <Link href="#paquetes" className="text-sm text-muted hover:text-primary transition-colors" aria-label="Ir a Paquetes">Paquetes</Link>
             <Link href="#contacto" className="text-sm text-muted hover:text-primary transition-colors" aria-label="Ir a Contacto">Contacto</Link>
           </nav>
        </div>

        {/* Contact Form */}
        <div className="space-y-6">
          <Form {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name" className="text-background">Nombre</FormLabel>
                      <FormControl>
                        <Input id="name" aria-label="Campo de entrada para nombre completo" placeholder="Tu nombre completo" {...field} className="bg-background text-foreground rounded-md"/>
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
                        <FormLabel htmlFor="email" className="text-background">Correo Electrónico</FormLabel>
                        <FormControl>
                            <Input id="email" type="email" aria-label="Campo de entrada para correo electrónico" placeholder="tu@email.com" {...field} className="bg-background text-foreground rounded-md"/>
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
                    <FormLabel htmlFor="restaurant" className="text-background">Nombre del Restaurante</FormLabel>
                    <FormControl>
                        <Input id="restaurant" aria-label="Campo de entrada para nombre del restaurante" placeholder="Nombre de tu negocio" {...field} className="bg-background text-foreground rounded-md"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                 <FormField
                    control={form.control}
                    name="package"
                    render={({ field }) => (
                        <FormItem>
                         {/* Use new package IDs and names */}
                        <FormLabel htmlFor="package" className="text-background">Paquete Deseado (Opcional)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                            <FormControl>
                            <SelectTrigger id="package" aria-label="Selector de paquete deseado" className="bg-background text-foreground rounded-md">
                                <SelectValue placeholder="Selecciona un paquete" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {availablePackages.map((pkg) => (
                                <SelectItem key={pkg.id} value={pkg.id} aria-label={`Opción de paquete ${pkg.name}`}>
                                {pkg.name}
                                </SelectItem>
                            ))}
                             <SelectItem value="no-estoy-seguro" aria-label="Opción: Aún no estoy seguro">Aún no estoy seguro</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                 {/* Removed Quantity Field as it's not in the new package structure */}

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
                          placeholder="Déjanos un mensaje o pregunta..."
                          {...field}
                          className="bg-background text-foreground rounded-md"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

             <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17, ease: "easeInOut" }}
              >
                 <Button type="submit" className="w-full rounded-2xl" disabled={isSubmitting} aria-label={isSubmitting ? "Enviando formulario" : "Enviar formulario de contacto"}>
                    {isSubmitting ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Enviando...
                        </>
                    ) : (
                        <>
                        Enviar Mensaje
                        <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                        </>
                    )}
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
