import { NavLink } from "react-router";
import { SMART_LIST } from "./tasks.constant";
import { Button } from "../primitive/button";
import { cn } from "@/lib/utils";

export const TasksSidenav = () => {
  return (
    <div className="h-screen w-[310px] py-3.5 px-3 hidden md:block md:border-r md:border-gray/10">
      <div className="flex flex-col gap-2">
        {SMART_LIST.map((item) => {
          const IconComponent = item.icon;

          return (
            <Button key={item.name} variant={"ghost"} asChild>
              <NavLink
                to={item.href}
                className={cn(
                  "h-9 pl-4 pr-2 flex items-center gap-1.5",
                  ({ isActive }) => isActive && "bg-sidenav-bg"
                )}
              >
                <IconComponent size={18} className="text-gray/40 shrink-0" />
                <span className="flex-1 text-gray text-sm truncate">
                  {item.name}
                </span>
              </NavLink>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
