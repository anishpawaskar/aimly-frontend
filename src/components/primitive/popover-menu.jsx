import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { buttonVariants } from "./button";
import { Slot } from "./slot";

const PopoverMenuContext = createContext(null);

const usePopoverMenu = () => useContext(PopoverMenuContext);

// NOTE: as of now component is being controlled from outside state figure out how to make it uncontrollable
const PopoverMenu = ({ open, onOpenChange, children }) => {
  const [contentStyles, setContentStyles] = useState({
    opacity: "0",
    visibility: "hidden",
  });

  const refs = {
    triggerRef: useRef(null),
    contentRef: useRef(null),
  };

  const contextValue = {
    isOpen: open,
    setIsOpen: onOpenChange,
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

  useLayoutEffect(() => {
    if (isOpen && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      console.log("trigger rect", triggerRect);
      console.log("content rect", contentRect);

      let x; // horizontal
      let y; // vertical

      switch (side) {
        case "bottom": {
          const triggerMiddleX = triggerRect.right - triggerRect.width / 2;
          x = triggerMiddleX - contentRect.width / 2;

          const potentialY = triggerRect.bottom + sideOffset;
          const isOverflowingBottom =
            potentialY + contentRect.height > windowHeight;

          if (isOverflowingBottom) {
            y = triggerRect.top - contentRect.height - sideOffset;
          } else {
            y = potentialY;
          }
          break;
        }

        case "top": {
          const triggerMiddleX = triggerRect.right - triggerRect.width / 2;
          x = triggerMiddleX - contentRect.width / 2;

          const potentialY = triggerRect.top - contentRect.height - sideOffset;
          const isOverflowingTop = potentialY < 0;

          if (isOverflowingTop) {
            y = triggerRect.bottom + sideOffset;
          } else {
            y = potentialY;
          }

          break;
        }

        case "right": {
          const triggerMiddleY = triggerRect.top + triggerRect.height / 2;
          y = triggerMiddleY - contentRect.height / 2;

          const potentialX = triggerRect.right + sideOffset;
          const isOverflowingRight =
            potentialX + contentRect.width > windowWidth;

          if (isOverflowingRight) {
            x = triggerRect.left - contentRect.width - sideOffset;
          } else {
            x = potentialX;
          }
          break;
        }

        case "left": {
          const triggerMiddleY = triggerRect.top + triggerRect.height / 2;
          y = triggerMiddleY - contentRect.height / 2;

          const potentialX = triggerRect.left - contentRect.width - sideOffset;
          const isOverflowingLeft = potentialX < 0;

          if (isOverflowingLeft) {
            x = triggerRect.right + sideOffset;
          } else {
            x = potentialX;
          }
          break;
        }
      }

      setContentStyles((prevState) => ({
        ...prevState,
        opacity: "1",
        visibility: "visible",
        transform: `translate(${x}px, ${y}px)`,
        alignItem: align,
      }));
    } else {
      setContentStyles({
        opacity: "0",
        visibility: "hidden",
      });
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
        "fixed top-0 left-0 z-30 bg-card-bg rounded-md p-3 min-w-52 shadow-default-app flex flex-col gap-4",
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
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        buttonVariants({ variant: "outlineGhost", isDisabled: false }),
        className
      )}
      onClick={() => setIsOpen(false)}
      {...props}
    />
  );
};

const PopoverMenuAction = ({ className, asChild = false, ...props }) => {
  const { setIsOpen } = usePopoverMenu();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant: "primary",
          isDisabled: props?.isDisabled ? true : false,
        }),
        className
      )}
      onClick={() => setIsOpen(false)}
      {...props}
    />
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
