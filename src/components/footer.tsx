
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  package: z.enum(['starter', 'pyme', 'premium', 'no-estoy-seguro'], { // Enforce package values
     errorMap: () => ({ message: "Selecciona un paquete válido." })
   }).optional(),
   // Add quantity field if needed, currently commented out as per original schema
  // quantity: z.number({ invalid_type_error: "La cantidad debe ser un número." }).int({ message: "La cantidad debe ser un número entero." }).positive({ message: "La cantidad debe ser mayor que 0." }).optional(),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }).max(500, { message: "El mensaje no puede exceder los 500 caracteres." }).optional(),
});

type ContactFormSchema = z.infer<typeof contactFormSchema>;

// Mock packages - replace with Firestore data later
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

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      restaurant: "",
      package: availablePackages.some(p => p.id === selectedPackageFromUrl) ? selectedPackageFromUrl as 'starter' | 'pyme' | 'premium' : undefined,
      message: "",
    },
     mode: "onChange", // Validate on change for better UX
  });

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
    }
  }, [searchParams, form]);


  const onSubmit = async (data: ContactFormSchema) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Enviando mensaje...'); // Loading toast

    try {
      const result = await sendContactForm(data);
      toast.success(result.message, { id: toastId }); // Success toast
      form.reset();
      // Reset package correctly after submission
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
        {/* Contact Info & Socials */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ponte en Contacto</h2>
          <p className="text-muted max-w-md"> {/* Changed text-muted-foreground to text-muted for better contrast */}
            ¿Tienes preguntas o estás listo para empezar? Rellena el formulario o contáctanos directamente.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted hover:text-primary transition-colors" aria-label="Facebook">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </Link>
            <Link href="#" className="text-muted hover:text-primary transition-colors" aria-label="Instagram">
               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </Link>
             <Link href="#" className="text-muted hover:text-primary transition-colors" aria-label="Whatsapp">
               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </Link>
          </div>
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

      {/* Copyright */}
      <div className="border-t border-border/20 mt-12">
        <div className="container mx-auto py-6 text-center text-sm text-muted"> {/* Changed text-muted-foreground to text-muted */}
          © {new Date().getFullYear()} TapMenu. Todos los derechos reservados.
        </div>
      </div>
    </motion.footer>
  );
}
