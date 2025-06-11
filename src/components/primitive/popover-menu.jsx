import { cn } from "@/lib/utils";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./button";
import { Slot } from "./slot";

const PopoverMenuContext = createContext(null);

const usePopoverMenu = () => useContext(PopoverMenuContext);

const PopoverMenu = ({ open, onOpenChange, defaultOpen, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentStyles, setContentStyles] = useState({
    opacity: "0",
    visibility: "hidden",
  });

  const prevRefValue = useRef(isOpen);

  useEffect(() => {
    console.log("Prev ref value", prevRefValue.current);
    console.log("isOpen value", isOpen);
  }, [isOpen, prevRefValue]);

  const refs = {
    triggerRef: useRef(null),
    contentRef: useRef(null),
  };

  const contextValue = {
    isOpen,
    setIsOpen,
    refs,
    contentStyles,
    setContentStyles,
  };

  return (
    <PopoverMenuContext.Provider value={contextValue}>
      {children}
    </PopoverMenuContext.Provider>
  );
};

const PopoverMenuTrigger = ({ className, children, ...props }) => {
  const {
    setIsOpen,
    refs: { triggerRef },
  } = usePopoverMenu();

  return (
    <button
      ref={triggerRef}
      className={cn("border rounded-md h-10 px-2", className)}
      onClick={() => setIsOpen((prevState) => !prevState)}
      {...props}
    >
      {children}
    </button>
  );
};

const PopoverMenuContent = ({
  className,
  side = "bottom",
  sideOffset = 10,
  align = "center",
  children,
}) => {
  const {
    isOpen,
    setIsOpen,
    contentStyles,
    setContentStyles,
    refs: { triggerRef, contentRef },
  } = usePopoverMenu();

  useEffect(() => {
    const handleClickOutside = (e) => {
      const trigger = triggerRef.current;
      const content = contentRef.current;

      if (
        trigger &&
        !trigger.contains(e.target) &&
        content &&
        !content.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [triggerRef, contentRef]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let x; // horizontal
      let y; // vertical

      switch (side) {
        case "bottom": {
          const triggerMiddleX = triggerRect.right - triggerRect.width / 2;
          x = triggerMiddleX - contentRect.width / 2;

          y = triggerRect.bottom + sideOffset;
        }
      }

      setContentStyles((prevState) => ({
        ...prevState,
        opacity: "1",
        visibility: "visible",
        transform: `translate(${x}px, ${y}px)`,
        alignItem: align,
      }));
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={contentRef}
      style={contentStyles}
      className={cn(
        "fixed top-0 left-0 rounded-md p-3 min-w-52 shadow-default-app flex flex-col gap-4",
        className
      )}
    >
      {children}
    </div>,
    document.body
  );
};

const PopoverMenuFooter = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("flex gap-4 justify-between items-center ", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const PopoverMenuCancel = ({ className, asChild = false, ...props }) => {
  const { setIsOpen } = usePopoverMenu();
  const Comp = asChild ? Slot : Button;

  return (
    <Comp
      variant={"outlineGhost"}
      className={className}
      onClick={() => setIsOpen(false)}
      {...props}
    />
  );
};

const PopoverMenuAction = ({ className, children, ...props }) => {
  const { setIsOpen } = usePopoverMenu();

  return (
    <Button
      variant={"primary"}
      className={className}
      onClick={() => setIsOpen(false)}
      {...props}
    >
      {children}
    </Button>
  );
};

export {
  PopoverMenu,
  PopoverMenuTrigger,
  PopoverMenuContent,
  PopoverMenuFooter,
  PopoverMenuCancel,
  PopoverMenuAction,
};
