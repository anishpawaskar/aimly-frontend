import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { createContext, useContext, useState } from "react";

const AvatarContext = createContext(null);

const useAvatar = () => useContext(AvatarContext);

const avatarVariants = cva(
  "relative flex items-center justify-center shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "rounded-full",
        square: "rounded-md",
      },
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Avatar = ({ size, variant, className, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <AvatarContext.Provider
      value={{ isLoaded, setIsLoaded, isError, setIsError }}
    >
      <div className={cn(avatarVariants({ variant, size }), className)}>
        {children}
      </div>
    </AvatarContext.Provider>
  );
};

const AvatarImage = ({ src, alt, className, ...props }) => {
  const { isError, setIsLoaded, setIsError } = useAvatar();

  if (isError) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setIsLoaded(true)}
      onError={() => setIsError(true)}
      {...props}
      className={cn("aspect-square object-cover h-full w-full", className)}
    />
  );
};

const AvatarFallback = ({ className, children }) => {
  const { isLoaded, isError } = useAvatar();

  // TODO: Something wrong while rendering fallback
  if (isLoaded && !isError) {
    return null;
  }

  return (
    <span
      className={cn(
        "flex h-full w-full items-center justify-center bg-red-300",
        className
      )}
    >
      {children}
    </span>
  );
};

export { Avatar, AvatarImage, AvatarFallback };
