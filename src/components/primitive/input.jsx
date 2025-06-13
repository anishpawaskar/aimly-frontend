import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

const inputVariants = cva(
  "h-10 w-full p-2 text-sm border border-gray/10 rounded-md bg-transparent focus:border-[var(--primary-color)] outline-none"
);

export const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(inputVariants(), className)}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
