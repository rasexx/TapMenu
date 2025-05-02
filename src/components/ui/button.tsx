import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      // Note: Tailwind doesn't have rounded-2xl by default in base config,
      // It relies on the theme setup in tailwind.config.js.
      // We apply rounded-md as default and override with specific classes like `rounded-2xl` where needed.
       rounded: { // Added rounded variant for easier application, defaults to md
           none: "rounded-none",
           sm: "rounded-sm",
           md: "rounded-md",
           lg: "rounded-lg",
           xl: "rounded-xl",
           '2xl': "rounded-2xl", // Allows using rounded='2xl' prop if needed, maps to rounded-2xl class
           full: "rounded-full",
       },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
       rounded: "md", // Default to md rounding
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    // Apply rounded class based on the prop, otherwise default from variants
    const roundedClass = rounded ? `rounded-${rounded === 'md' ? 'md' : rounded}` : ''; // Handle 'md' case explicitly if needed elsewhere or rely on default variant

    return (
      <Comp
        // Use the generated variants and merge with explicit className and roundedClass
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button"

export { Button, buttonVariants }
