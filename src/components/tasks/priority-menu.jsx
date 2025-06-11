import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IconButton } from "../primitive/icon-button";
import { Check, Flag } from "lucide-react";
import { createPortal } from "react-dom";
import { clampX, clampY, cn } from "@/lib/utils";
import { Button } from "../primitive/button";
import { GAP_BETWEEN_SCREEN } from "@/constants";

const PriorityMenuContext = createContext(null);

const usePriorityMenu = () => useContext(PriorityMenuContext);

const PRIORITY = [
  {
    name: "High",
    value: 5,
    color: "text-priority-high",
    fillColor: "fill-priority-high",
  },
  {
    name: "Medium",
    value: 3,
    color: "text-priority-medium",
    fillColor: "fill-priority-medium",
  },
  {
    name: "Low",
    value: 1,
    color: "text-priority-low",
    fillColor: "fill-priority-low",
  },
  {
    name: "None",
    value: 0,
    color: "text-gray/60",
    fillColor: "fill-transparent",
  },
];

const PriorityMenu = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentStyles, setContentStyles] = useState({
    opacity: "0",
    visibility: "hidden",
  });

  const refs = {
    triggerRef: useRef(null),
    contentRef: useRef(null),
  };

  const contextValue = {
    value,
    onValueChange,
    isOpen,
    setIsOpen,
    contentStyles,
    setContentStyles,
    triggerRef: refs?.triggerRef,
    contentRef: refs.contentRef,
  };

  return (
    <PriorityMenuContext.Provider value={contextValue}>
      {children}
    </PriorityMenuContext.Provider>
  );
};

const PriorityMenuTrigger = ({ size = "sm", className }) => {
  const { setIsOpen, triggerRef, value } = usePriorityMenu();

  const selectedPriority = PRIORITY.find((item) => item.value === value);

  return (
    <IconButton
      ref={triggerRef}
      variant={"ghost"}
      size={size}
      className={className}
      onClick={() => setIsOpen((prevState) => !prevState)}
    >
      <Flag
        size={16}
        className={cn(selectedPriority.color, selectedPriority.fillColor)}
      />
    </IconButton>
  );
};

const PriorityMenuContent = ({
  className,
  side = "bottom",
  sideOffset = 10,
}) => {
  const {
    isOpen,
    contentRef,
    contentStyles,
    setContentStyles,
    triggerRef,
    setIsOpen,
  } = usePriorityMenu();

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

      let x; // horizontal
      let y; // vertical

      switch (side) {
        case "bottom": {
          const triggerMiddleX = triggerRect.left + triggerRect.width / 2;
          const potentialX = triggerMiddleX - contentRect.width / 2;

          x = clampX(potentialX, contentRect.width);

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

          x = clampX(potentialX, contentRect.width);

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

          y = clampY(potentialY, contentRect.height);

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

          y = clampY(potentialY, contentRect.height);

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
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={contentRef}
      style={contentStyles}
      className={cn(
        "fixed top-0 left-0 w-44 rounded-md shadow-default-app bg-card-bg p-1.5",
        className
      )}
    >
      <ul className="w-full rounded-sm">
        {PRIORITY.map((item) => {
          return <PriorityMenuItem item={item} key={item.name} />;
        })}
      </ul>
    </div>,
    document.body
  );
};

const PriorityMenuItem = ({ item }) => {
  const { value, onValueChange, setIsOpen } = usePriorityMenu();
  const isSelected = item.value === value;

  return (
    <li className="w-full h-8">
      <Button
        variant={"ghost"}
        onClick={() => {
          onValueChange(item.value);
          setIsOpen(false);
        }}
        className="flex items-center justify-between w-full h-full px-2.5"
      >
        <span className="flex items-center gap-3">
          <Flag size={16} className={cn(item.color, item.fillColor)} />
          <span className="text-sm">{item.name}</span>
        </span>
        {isSelected && (
          <Check size={16} className="text-[var(--primary-color)]" />
        )}
      </Button>
    </li>
  );
};

export { PriorityMenu, PriorityMenuTrigger, PriorityMenuContent };
