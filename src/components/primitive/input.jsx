import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const inputVariants = cva(
  "h-10 w-full p-2 text-sm border border-gray/10 rounded-md bg-transparent focus:border-[var(--primary-color)] outline-none"
);

export const Input = ({ className, type, ref, ...props }) => {
  return (
    <input
      type={type}
      className={cn(inputVariants(), className)}
      ref={ref}
      {...props}
    />
  );
};
