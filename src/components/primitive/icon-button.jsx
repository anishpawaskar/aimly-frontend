import { cn } from "@/lib/utils";
import { Slot } from "./slot";
import { cva } from "class-variance-authority";

const iconButtonVariants = cva("flex items-center justify-center rounded-md", {
  variants: {
    variant: {
      default:
        "bg-[var(--primary-color)] text-[var(--primary-foreground-color)]",
      primary: "bg-primary text-primary-foreground",
      outlinePrimary: "border border-primary text-primary",
      outlineGhost: "border border-gray/10 text-gray/60",
      ghost: "text-gray/60",
    },
    size: {
      default: "h-10 w-10",
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      lg: "h-12 w-12",
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
        "hover:bg-[var(--primary-color-hover)] hover:text-[--primary-foreground-color] active:bg-[var(--primary-color-active)] active:text-[--primary-foreground-color]",
    },
    {
      variant: "default",
      isDisabled: true,
      class: "disabled:bg-[var(--primary-disable-color)]",
    },
    {
      variant: "primary",
      isDisabled: false,
      class: "hover:bg-btn-hover-color active:bg-btn-active-color",
    },
    {
      variant: "primary",
      isDisabled: true,
      class: "disabled:bg-btn-disable-color",
    },
    {
      variant: "outlineGhost",
      isDisabled: false,
      class: "hover:bg-cancel-btn-hover active:bg-cancel-btn-active",
    },
    {
      variant: "ghost",
      isDisabled: false,
      class: "hover:bg-cancel-btn-hover active:bg-cancel-btn-active",
    },
    {
      variant: "outlinePrimary",
      isDisabled: false,
      class:
        "hover:bg-btn-hover-color hover:text-[--primary-foreground-color] active:bg-btn-active-color active:text-[--primary-foreground-color]",
    },
    {
      variant: "outlinePrimary",
      isDisabled: true,
      class: "disabled:bg-btn-disable-color",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const IconButton = ({
  variant,
  size,
  asChild = false,
  className,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        iconButtonVariants({
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

export { IconButton };
