import { NavLink } from "react-router";
import { SIDENAV_ACCORDION_ITEMS, SMART_LIST } from "./tasks.constant";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/theme-provider";
import { Accordion } from "../primitive/accordion";
import { TasksSidenavAccordionItem } from "./sidenav-accodion-item";
import { TasksSidenavProvider } from "@/context/tasks-sidenav-provider";
import { useAppSettings } from "@/context/app-settings-provider";
import { Inbox, SquareCheckBig, Trash2 } from "lucide-react";

export const TasksSidenav = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { userSettings } = useAppSettings();
  const smartProjects = userSettings?.smartProjects ?? [];

  return (
    <div
      className={cn(
        "h-screen w-[310px] py-3.5 px-3 hidden md:block md:border-r md:border-gray/10 overflow-y-auto",
        isLight ? "bg-transparent" : "tasks-nav-gradient-bg"
      )}
    >
      <div className="flex flex-col">
        {smartProjects.map((item) => {
          let IconComponent;
          let href;

          switch (item.name) {
            case "Inbox": {
              IconComponent = Inbox;
              href = "/projects/inbox/tasks";
              break;
            }

            case "Completed": {
              IconComponent = SquareCheckBig;
              href = "/completed";
              break;
            }

            case "Trash": {
              IconComponent = Trash2;
              href = "/trash";
              break;
            }
          }

          return (
            <NavLink
              key={item.name}
              to={href}
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
      <Accordion type="multiple" className={"p-0"}>
        {SIDENAV_ACCORDION_ITEMS.map((item) => {
          return (
            // <TasksSidenavProvider key={item.title}>
            //   <TasksSidenavAccordionItem item={item} />
            // </TasksSidenavProvider>
            <TasksSidenavAccordionItem key={item.title} item={item} />
          );
        })}
      </Accordion>
    </div>
  );
};
