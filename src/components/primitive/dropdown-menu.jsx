import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Slot } from "./slot";
import { clampX, clampY, cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { GAP_BETWEEN_SCREEN } from "@/constants";

const DropdownMenuContext = createContext(null);
const useDropdownMenu = () => useContext(DropdownMenuContext);

const DropdownMenu = ({ open, onOpenChange, children }) => {
  const [contentStyles, setContentStyles] = useState({
    opacity: "0",
    visibility: "hidden",
  });

  const refs = {
    triggerRef: useRef(null),
    contentRef: useRef(null),
  };

  const contextValue = {
    open,
    onOpenChange,
    triggerRef: refs.triggerRef,
    contentRef: refs.contentRef,
    contentStyles,
    setContentStyles,
  };

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      {children}
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = ({ asChild = false, className, children }) => {
  const { triggerRef, onOpenChange } = useDropdownMenu();
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

const DropdownMenuContent = ({
  className,
  side = "bottom",
  sideOffset = 10,
  align = "center",
  alignOffset = 0,
  children,
}) => {
  const {
    open,
    onOpenChange,
    contentRef,
    triggerRef,
    contentStyles,
    setContentStyles,
  } = useDropdownMenu();

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
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [triggerRef, contentRef]);

  useLayoutEffect(() => {
    if (open && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let x; // horizontal
      let y; // vertical
      switch (side) {
        case "bottom": {
          const triggerMiddleX = triggerRect.left + triggerRect.width / 2;
          const potentialX = triggerMiddleX - contentRect.width / 2;

          switch (align) {
            case "center": {
              x = clampX(potentialX, contentRect.width);
              break;
            }

            case "end": {
              const isOverflowingEnd =
                triggerRect.right +
                  contentRect.width +
                  alignOffset +
                  GAP_BETWEEN_SCREEN >
                windowWidth;

              if (isOverflowingEnd) {
                x = triggerRect.left - contentRect.width + alignOffset;
              } else {
                x = triggerRect.right - alignOffset;
              }
              break;
            }

            case "start": {
              const isOverFlowingStart =
                triggerRect.left -
                  contentRect.width -
                  GAP_BETWEEN_SCREEN +
                  alignOffset <
                0;

              if (isOverFlowingStart) {
                x = triggerRect.right - alignOffset;
              } else {
                x = triggerRect.left - contentRect.width + alignOffset;
              }
              break;
            }
          }

          const potentialY = triggerRect.bottom + sideOffset;
          const isOverflowingBottom =
            potentialY + contentRect.height > windowHeight - GAP_BETWEEN_SCREEN;

          if (isOverflowingBottom) {
            y = triggerRect.top - contentRect.height - sideOffset;
          } else {
            y = potentialY;
          }

          break;
        }

        case "top": {
          const triggerMiddleX = triggerRect.right - triggerRect.width / 2;
          const potentialX = triggerMiddleX - contentRect.width / 2;

          switch (align) {
            case "center": {
              x = clampX(potentialX, contentRect.width);
              break;
            }

            case "end": {
              const isOverflowingEnd =
                triggerRect.right +
                  contentRect.width +
                  alignOffset +
                  GAP_BETWEEN_SCREEN >
                windowWidth;

              if (isOverflowingEnd) {
                x = triggerRect.left - contentRect.width + alignOffset;
              } else {
                x = triggerRect.right - alignOffset;
              }
              break;
            }

            case "start": {
              const isOverFlowingStart =
                triggerRect.left -
                  contentRect.width -
                  GAP_BETWEEN_SCREEN +
                  alignOffset <
                0;

              if (isOverFlowingStart) {
                x = triggerRect.right - alignOffset;
              } else {
                x = triggerRect.left - contentRect.width + alignOffset;
              }
              break;
            }
          }

          const potentialY = triggerRect.top - contentRect.height - sideOffset;
          const isOverflowingTop = potentialY + GAP_BETWEEN_SCREEN < 0;

          if (isOverflowingTop) {
            y = triggerRect.bottom + sideOffset;
          } else {
            y = potentialY;
          }

          break;
        }

        case "right": {
          const triggerMiddleY = triggerRect.top + triggerRect.height / 2;
          const potentialY = triggerMiddleY - contentRect.height / 2;

          switch (align) {
            case "center": {
              y = clampY(potentialY, contentRect.height);
              break;
            }

            case "end": {
              const isOverFlowingEnd =
                triggerRect.bottom +
                  contentRect.height +
                  alignOffset +
                  GAP_BETWEEN_SCREEN >
                windowHeight;

              if (isOverFlowingEnd) {
                y = triggerRect.top - contentRect.height - alignOffset;
              } else {
                y = triggerRect.bottom + alignOffset;
              }
              break;
            }

            case "start": {
              const isOverFlowingStart =
                triggerRect.top -
                  contentRect.height -
                  alignOffset -
                  GAP_BETWEEN_SCREEN <
                0;

              if (isOverFlowingStart) {
                y = triggerRect.bottom + alignOffset;
              } else {
                y = triggerRect.top - contentRect.height - alignOffset;
              }
              break;
            }
          }

          const potentialX = triggerRect.right + sideOffset;
          const isOverflowingRight =
            potentialX + contentRect.width > windowWidth - GAP_BETWEEN_SCREEN;

          if (isOverflowingRight) {
            x = triggerRect.left - contentRect.width - sideOffset;
          } else {
            x = potentialX;
          }
          break;
        }

        case "left": {
          const triggerMiddleY = triggerRect.top + triggerRect.height / 2;
          const potentialY = triggerMiddleY - contentRect.height / 2;

          switch (align) {
            case "center": {
              y = clampY(potentialY, contentRect.height);
              break;
            }

            case "end": {
              const isOverFlowingEnd =
                triggerRect.bottom +
                  contentRect.height +
                  alignOffset +
                  GAP_BETWEEN_SCREEN >
                windowHeight;

              if (isOverFlowingEnd) {
                y = triggerRect.top - contentRect.height - alignOffset;
              } else {
                y = triggerRect.bottom + alignOffset;
              }
              break;
            }

            case "start": {
              const isOverFlowingStart =
                triggerRect.top -
                  contentRect.height -
                  alignOffset -
                  GAP_BETWEEN_SCREEN <
                0;

              if (isOverFlowingStart) {
                y = triggerRect.bottom + alignOffset;
              } else {
                y = triggerRect.top - contentRect.height - alignOffset;
              }
              break;
            }
          }

          const potentialX = triggerRect.left - contentRect.width - sideOffset;
          const isOverflowingLeft = potentialX + GAP_BETWEEN_SCREEN < 0;

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
  }, [open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <ul
      style={contentStyles}
      ref={contentRef}
      className={cn(
        "fixed top-0 left-0 z-30 bg-card-bg rounded-md p-1.5 shadow-default-app flex flex-col",
        className
      )}
    >
      {children}
    </ul>,
    document.body
  );
};

const DropdownMenuItem = ({
  asChild = false,
  disabled = false,
  children,
  className,
}) => {
  const { onOpenChange } = useDropdownMenu();
  const Comp = asChild ? Slot : "button";

  return (
    <li className="rounded-md">
      <Comp
        className={cn(
          "h-8 flex items-center text-[13px] leading-8 truncate px-3 min-w-36",
          className
        )}
        disabled={disabled}
        onClick={() => onOpenChange(false)}
      >
        {children}
      </Comp>
    </li>
  );
};

const DropdownMenuSeparator = () => {
  return <hr className="my-1 text-gray/30" />;
};

const DropdownMenuLabel = ({ asChild = false, className, children }) => {
  const Comp = asChild ? Slot : "p";

  return <Comp className={cn("text-sm text-gray", className)}>{children}</Comp>;
};
// TODO: later add sub content and grouping

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
};
