import { clampX, clampY, cn } from "@/lib/utils";
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
import { GAP_BETWEEN_SCREEN } from "@/constants";

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

const PopoverMenuTrigger = ({ className, asChild = false, children }) => {
  const Comp = asChild ? Slot : "button";
  const {
    setIsOpen,
    refs: { triggerRef },
  } = usePopoverMenu();

  return (
    <Comp
      ref={triggerRef}
      className={cn("border rounded-md h-10 px-2", className)}
      onClick={() => setIsOpen((prevState) => !prevState)}
    >
      {children}
    </Comp>
  );
};

const PopoverMenuContent = ({
  className,
  side = "bottom",
  sideOffset = 10,
  align = "center",
  alignOffset = 0,
  handleReset = () => {},
  anchorRef,
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

      const clickOutSideContent = content && !content.contains(e.target);

      if (!anchorRef) {
        if (trigger && !trigger.contains(e.target) && clickOutSideContent) {
          setIsOpen(false);
          handleReset();
        }
      } else {
        if (clickOutSideContent) {
          setIsOpen(false);
          handleReset();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [triggerRef, contentRef]);

  useLayoutEffect(() => {
    if (isOpen && contentRef.current) {
      const triggerRect =
        anchorRef?.current?.getBoundingClientRect() ||
        triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let x; // horizontal
      let y; // vertical

      switch (side) {
        case "bottom": {
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
