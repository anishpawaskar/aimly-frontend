import { NavLink } from "react-router";
import { SMART_LIST } from "./tasks.constant";
import { Button } from "../primitive/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/theme-provider";
import { Accordion } from "../primitive/accordion";
import { ProjectsAccordionItem } from "./projects-accodion-item";

export const TasksSidenav = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={cn(
        "h-screen w-[310px] py-3.5 px-3 hidden md:block md:border-r md:border-gray/10",
        isLight ? "bg-transparent" : "tasks-nav-gradient-bg"
      )}
    >
      <div className="flex flex-col">
        {SMART_LIST.map((item) => {
          const IconComponent = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "h-9 pl-4 pr-2 flex items-center gap-1.5 sm:hover:bg-cancel-btn-hover sm:active:bg-cancel-btn-active rounded-md transition-colors",
                  isActive && "bg-gray/5"
                )
              }
            >
              <IconComponent size={18} className="text-gray/40 shrink-0" />
              <span className="flex-1 text-gray text-sm truncate">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </div>
      <hr className="text-gray/10 my-2" />
      <Accordion className={"p-0"}>
        <ProjectsAccordionItem />
      </Accordion>
    </div>
  );
};
