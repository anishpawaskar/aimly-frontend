import { cn } from "@/lib/utils";
import { createContext, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { Slot } from "./slot";
import { buttonVariants } from "./button";

const AlertDialogContext = createContext(null);
const useAlertDialog = () => useContext(AlertDialogContext);

const AlertDialog = ({ open, onOpenChange, children }) => {
  const refs = {
    triggerRef: useRef(null),
    contentRef: useRef(null),
  };

  const contextValue = {
    open,
    onOpenChange,
    triggerRef: refs.triggerRef,
    contentRef: refs.contentRef,
  };

  return (
    <AlertDialogContext.Provider value={contextValue}>
      {children}
    </AlertDialogContext.Provider>
  );
};

const AlertDialogTrigger = ({ className, children, asChild = false }) => {
  const { onOpenChange, triggerRef } = useAlertDialog();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "flex items-center justify-center whitespace-nowrap text-sm rounded-md transition-all",
        className
      )}
      ref={triggerRef}
      onClick={() => onOpenChange((prevState) => !prevState)}
    >
      {children}
    </Comp>
  );
};

const AlertDialogContent = ({ className, children }) => {
  const { open } = useAlertDialog();

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="popup-cover h-full w-full fixed inset-0 z-40">
      <div
        className={cn(
          "popup fixed top-1/5 left-1/2 -translate-x-1/2  z-50 shadow-default-app rounded-md flex flex-col gap-4 min-w-[400px] bg-card-bg max-w-[90%] min-h-44 max-h-[500px] p-5",
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

const AlertDialogTitle = ({ className, asChild = false, children }) => {
  const Comp = asChild ? Slot : "h3";

  return (
    <Comp className={cn("text-lg text-gray font-semibold", className)}>
      {children}
    </Comp>
  );
};

const AlertDialogDescription = ({ className, asChild = false, children }) => {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp className={cn("text-sm text-gray flex-1 break-words", className)}>
      {children}
    </Comp>
  );
};

const AlertDialogFooter = ({ className, children }) => {
  return (
    <div className={cn("flex items-center justify-end gap-4", className)}>
      {children}
    </div>
  );
};

const AlertDialogCancel = ({ className, asChild = false, children }) => {
  const Comp = asChild ? Slot : "button";
  const { onOpenChange } = useAlertDialog();

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant: "outlineGhost",
        }),
        "min-w-[100px] h-[30px]",
        className
      )}
      onClick={() => onOpenChange(false)}
    >
      {children}
    </Comp>
  );
};

const AlertDialogAction = ({ className, asChild = false, children }) => {
  const Comp = asChild ? Slot : "button";
  const { onOpenChange } = useAlertDialog();

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant: "primary",
        }),
        "min-w-[100px] h-[30px]",
        className
      )}
      onClick={() => onOpenChange(false)}
    >
      {children}
    </Comp>
  );
};

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
};
