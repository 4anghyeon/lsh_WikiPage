import React from 'react';
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "@/app/lib/utils";

const buttonVariants = cva(
  "h-10 px-4 font-medium bg-white rounded-lg hover:bg-slate-50 hover:duration-100",
  {
    variants: {
      variant: {
        default: "h-10 px-4 font-medium bg-white rounded-lg hover:bg-slate-50 hover:duration-100",
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
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = ({className, variant, ...props}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, className }))}>
      {props.children}
    </button>
  );
};

export default Button;
