import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/app/lib/utils';

const buttonVariants = cva('h-10 px-4 font-medium bg-white rounded-lg hover:bg-slate-50 hover:duration-100', {
  variants: {
    variant: {
      default: 'h-10 px-4 font-medium bg-white rounded-lg hover:bg-slate-50 hover:duration-100',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      primary: 'bg-blue-400 hover:bg-blue-500 text-white',
      secondary: 'bg-slate-100 hover:bg-slate-50',
      danger: 'bg-red-400 hover:bg-red-300 text-white',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({ className, variant, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, className }))} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
