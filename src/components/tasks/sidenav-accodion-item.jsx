import { Plus } from "lucide-react";
import { AccordionItem, AccordionTrigger } from "../primitive/accordion";
import { Button } from "../primitive/button";
import { AlertDialog, AlertDialogTrigger } from "../primitive/alert-dialog";
import { useState } from "react";
import { SidenavAccordionContent } from "./sidenav-accordion-content";

export const TasksSidenavAccordionItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const FormComponent = item.form;

  return (
    <AccordionItem value={item.value}>
      <Button variant={"ghost"} asChild>
        <div className="h-8 w-full justify-between pr-2 group/trigger cursor-pointer">
          <AccordionTrigger
            className={
              "flex-1 text-xs text-gray/50 font-medium truncate h-full"
            }
          >
            {item.title}
          </AccordionTrigger>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <button
                className="shrink-0 h-5 w-5 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
              >
                <Plus
                  size={16}
                  className="text-gray/40 hover:text-gray/60 hidden group-hover/trigger:block"
                />
              </button>
            </AlertDialogTrigger>
            <FormComponent onOpenChange={setIsOpen} />
          </AlertDialog>
        </div>
      </Button>

      <SidenavAccordionContent item={item} />
    </AccordionItem>
  );
};
