import { Children, createContext, useContext, useState } from "react";
import { Slot } from "./slot";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const AccordionContext = createContext(null);
const useAccordion = () => useContext(AccordionContext);

const Accordion = ({
  type = "single",
  asChild = false,
  children,
  className,
}) => {
  const [accordionState, setAccordionState] = useState(() =>
    type === "single" ? "" : []
  );

  const Comp = asChild ? Slot : "ul";

  const contextValue = {
    accordionState,
    setAccordionState,
    type,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <Comp className={cn("min-w-[200px] py-2 px-3", className)}>
        {children}
      </Comp>
    </AccordionContext.Provider>
  );
};

const AccordionItemContext = createContext(null);
const useAccordionItem = () => useContext(AccordionItemContext);

const AccordionItem = ({ value, asChild = false, className, children }) => {
  const { accordionState, type } = useAccordion();

  const Comp = asChild ? Slot : "li";
  let isOpen;

  switch (type) {
    case "single": {
      isOpen = accordionState === value;
      break;
    }

    case "multiple": {
      isOpen = accordionState.includes(value);
      break;
    }
  }

  const contextValue = {
    value,
    isOpen,
  };

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <Comp className={cn("w-full", className)}>{children}</Comp>
    </AccordionItemContext.Provider>
  );
};

const AccordionTrigger = ({ children, asChild = false, className }) => {
  const { type, accordionState, setAccordionState } = useAccordion();
  const { value, isOpen } = useAccordionItem();

  const Comp = asChild ? Slot : "button";

  const handleTrigger = () => {
    if (type === "single") {
      setAccordionState((prevState) => (prevState === value ? "" : value));
    }

    if (type === "multiple") {
      const isAlreadyOpen = accordionState.find(
        (accordionValue) => accordionValue === value
      );

      if (isAlreadyOpen) {
        const updatedAccordionState = accordionState.filter(
          (accordionValue) => accordionValue !== value
        );

        setAccordionState(updatedAccordionState);
      } else {
        setAccordionState((prevState) => [...prevState, value]);
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      <ChevronDown
        size={16}
        className={cn(
          isOpen && "rotate-180",
          "shrink-0 text-gray/60 absolute top-1/2 left-0 -translate-y-1/2"
        )}
      />
      <Comp
        className={cn(
          "w-full pl-5 h-6 flex flex-1 items-center gap-3 text-sm",
          className
        )}
        onClick={handleTrigger}
      >
        {children}
      </Comp>
    </div>
  );
};

const AccordionContent = ({ asChild = false, children, className }) => {
  const { isOpen } = useAccordionItem();

  const Comp = asChild ? Slot : "div";

  if (!isOpen) {
    return null;
  }

  return (
    <Comp
      className={cn("max-h-[500px] w-full overflow-y-auto text-sm", className)}
    >
      {children}
    </Comp>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
