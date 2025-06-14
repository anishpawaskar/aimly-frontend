import { AlignJustify, Ellipsis, Plus } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../primitive/accordion";
import { Button } from "../primitive/button";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import { AlertDialog, AlertDialogTrigger } from "../primitive/alert-dialog";
import { useState } from "react";
import { useTasksSidenav } from "@/context/tasks-sidenav-provider";
import { SidenavAccordionContent } from "./sidenav-accordion-content";

export const TasksSidenavAccordionItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useTasksSidenav();
  const FormComponent = item.form;
  const data = [...items];

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

      {/* <AccordionContent asChild>
        <ul
          // TODO: figure out way to hide scroll because two two scolls are appearing
          className="max-h-none"
        >
          {!!!data.length ? (
            <li className="text-xs text-gray/40 bg-gray/5 rounded-md py-2 px-[14px] pl-5">
              {item.fallbackText}
            </li>
          ) : (
            data
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((dataItem) => {
                return (
                  <li key={dataItem._id}>
                    <NavLink
                      to={item.href({ id: dataItem._id })}
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
                        {dataItem.name}
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
                  </li>
                );
              })
          )}
        </ul>
      </AccordionContent> */}
      <SidenavAccordionContent item={item} />
    </AccordionItem>
  );
};
