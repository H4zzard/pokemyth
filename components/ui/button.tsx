import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 clip-chamfer-sm",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-magenta to-arcane text-white shadow-glow hover:brightness-110 hover:shadow-[0_0_50px_-10px_rgba(217,70,239,0.6)]",
        secondary:
          "bg-bg-card text-ink border border-border hover:border-magenta/50 hover:bg-white/[0.03]",
        outline:
          "border border-magenta/40 text-ink hover:bg-magenta/10 hover:border-magenta",
        ghost: "text-muted hover:text-ink hover:bg-white/[0.04]",
        gold: "bg-transparent border border-gold/50 text-gold hover:bg-gold/10",
        destructive:
          "bg-destructive/90 text-white hover:bg-destructive",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-sm py-3.5",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
