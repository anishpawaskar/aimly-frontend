import { cn } from "@/lib/utils";
import { Slot } from "./slot";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary-color)] text-[var(--primary-foreground-color)]",
        primary: "bg-primary text-primary-foreground",
        outlinePrimary: "border border-primary text-primary-foreground",
        outlineGhost: "border border-gray/10 text-gray/60",
        ghost: "text-gray/60",
        destructive: "text-gray/60",
      },
      size: {
        default: "h-10 px-4",
        xs: "h-6 px-3",
        sm: "h-8  px-3",
        lg: "h-10  px-8",
        full: "h-10 w-full px-4",
      },
      isDisabled: {
        false: null,
        true: "cursor-not-allowed",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        isDisabled: false,
        class:
          "sm:hover:bg-[var(--primary-color-hover)] sm:active:bg-[var(--primary-color-active)]",
      },
      {
        variant: "default",
        isDisabled: true,
        class: "disabled:bg-[var(--primary-disable-color)]",
      },
      {
        variant: "primary",
        isDisabled: false,
        class: "sm:hover:bg-btn-hover-color sm:active:bg-btn-active-color",
      },
      {
        variant: "primary",
        isDisabled: true,
        class: "disabled:bg-btn-disable-color",
      },
      {
        variant: "outlineGhost",
        isDisabled: false,
        class: "sm:hover:bg-cancel-btn-hover sm:active:bg-cancel-btn-active",
      },
      {
        variant: "outlinePrimary",
        isDisabled: false,
        class: "sm:hover:bg-btn-hover-color sm:active:bg-btn-active-color",
      },
      {
        variant: "outlinePrimary",
        isDisabled: true,
        class: "disabled:bg-btn-disable-color",
      },
      {
        variant: "ghost",
        isDisabled: false,
        class: "sm:hover:bg-cancel-btn-hover sm:active:bg-cancel-btn-active",
      },
      {
        variant: "destructive",
        isDisabled: false,
        class:
          "sm:hover:text-wran-red sm:hover:bg-wran-red/40 active:bg-wran-red/60",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = ({ size, variant, className, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          size,
          isDisabled: props?.disabled ? true : false,
        }),
        className
      )}
      {...props}
    />
  );
};

export { Button, buttonVariants };
