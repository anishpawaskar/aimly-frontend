import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Slot } from "./slot";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

const TooltipContext = createContext(null);
const useTooltip = () => useContext(TooltipContext);

const Tooltip = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentStyles, setContentStyles] = useState({
    opacity: "0",
    visibility: "hidden",
  });

  const refs = {
    triggerRef: useRef(null),
    contentRef: useRef(null),
  };

  const contextValue = {
    isVisible,
    setIsVisible,
    triggerRef: refs.triggerRef,
    contentRef: refs.contentRef,
    contentStyles,
    setContentStyles,
  };

  return (
    <TooltipContext.Provider value={contextValue}>
      {children}
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = ({ className, asChild = false, children }) => {
  const { triggerRef, setIsVisible } = useTooltip();

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(className)}
      ref={triggerRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
    </Comp>
  );
};

const TooltipContent = ({
  side = "bottom",
  sideOffset = 4,
  className,
  children,
}) => {
  const { isVisible, triggerRef, contentRef, contentStyles, setContentStyles } =
    useTooltip();

  useLayoutEffect(() => {
    if (isVisible && contentRef.current) {
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
      }));
    } else {
      setContentStyles({
        opacity: "0",
        visibility: "hidden",
      });
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <div
      style={contentStyles}
      ref={contentRef}
      className={cn(
        "fixed top-0 left-0 z-40 text-primary-foreground text-xs bg-black/60 p-1 rounded-sm",
        className
      )}
    >
      {children}
    </div>,
    document.body
  );
};

export { Tooltip, TooltipTrigger, TooltipContent };
