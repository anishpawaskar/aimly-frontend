import { AlignJustify, Ellipsis, Plus } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../primitive/accordion";
import { Button } from "../primitive/button";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../primitive/alert-dialog";
import { useState } from "react";

export const TasksSidenavAccordionItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem value={"projects"}>
      <Button variant={"ghost"} asChild>
        <div className="h-8 w-full justify-between pr-2 group/trigger cursor-pointer">
          <AccordionTrigger
            className={"flex-1 text-xs text-gray/50 font-medium truncate"}
          >
            Lists
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
            <AlertDialogContent>
              <AlertDialogTitle>Add Lists</AlertDialogTitle>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button variant={"primary"}>Add</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Button>
      {/* <AccordionTrigger asChild>
        <Button variant={"ghost"} asChild>
          <div className="h-8 pr-2 group/trigger cursor-pointer">
            <span className="text-xs text-gray/50 font-medium flex-1 truncate">
              Lists
            </span>
            <button
              className="shrink-0 h-5 w-5 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Plus
                size={16}
                className="text-gray/40 hover:text-gray/60 hidden group-hover/trigger:block"
              />
            </button>
          </div>
        </Button>
      </AccordionTrigger> */}
      <AccordionContent asChild className={"flex flex-col"}>
        <ul>
          {[...new Array(5)].fill(5).map((_, idx) => {
            return (
              <NavLink
                key={idx}
                to={`/tasks/${idx}`}
                className={({ isActive }) =>
                  cn(
                    "h-9 pl-4 pr-2 flex items-center relative group/content sm:hover:bg-cancel-btn-hover sm:active:bg-cancel-btn-active rounded-md transition-colors",
                    isActive && "bg-gray/5"
                  )
                }
              >
                <AlignJustify
                  size={18}
                  className="text-gray/40 shrink-0 mr-2"
                />
                <span className="flex-1 text-sm text-gray truncate">
                  List {idx + 1}
                </span>
                <button
                  className={cn(
                    "shrink-0 h-5 w-5 hidden group-hover/content:block"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    console.log("open dropdown menu");
                  }}
                >
                  <Ellipsis size={16} className="text-gray/40" />
                </button>
                <span
                  className={cn(
                    "text-xs text-gray/40 absolute right-[15px] top-1/2 -translate-y-1/2 group-hover/content:hidden block"
                  )}
                >
                  3
                </span>
              </NavLink>
            );
          })}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};
