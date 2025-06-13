import { useTheme } from "@/context/theme-provider";
import { HomeIcon, Icon, LogOut } from "lucide-react";
import { Link, NavLink } from "react-router";
import { SIDE_NAV_DATA } from "./sidenav.contant";
import { cn } from "@/lib/utils";
import { IconButton } from "../primitive/icon-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../primitive/tooltip";

const SidenavDesktop = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={cn(
        "sidenav-desktop border-r border-gray/10 px-1 pt-3.5 pb-5 w-[60px] flex flex-col justify-between items-center bg-sidenav-bg"
        // isLight ? "bg-sidenav-bg" : "sidenav-gradient-bg"
      )}
    >
      <ul className="sidenav-list w-full flex flex-col gap-4 items-center">
        <li className="sidenav-list-item home-link w-full group/sidenav relative h-9">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={"/"}
                className="w-full h-full flex items-center justify-center"
              >
                <HomeIcon
                  size={22}
                  className="text-gray/40 group-hover/sidenav:text-gray/60 transition-colors"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              Home
            </TooltipContent>
          </Tooltip>
        </li>

        {SIDE_NAV_DATA.map((sidenav) => {
          const IconComponent = sidenav.icon;

          return (
            <li
              key={sidenav.label}
              className="sidenav-list-item group/sidenav w-full h-8"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={sidenav.href}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {({ isActive }) => (
                      <IconComponent
                        size={22}
                        className={cn(
                          isActive
                            ? "text-primary"
                            : "text-gray/40 group-hover/sidenav:text-gray/60 transition-colors"
                        )}
                      />
                    )}
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  {sidenav.label}
                </TooltipContent>
              </Tooltip>
            </li>
          );
        })}
      </ul>
      <div className="w-full h-8 group/sidenav">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to={"/"} className="w-full h-full flex justify-center">
              <button>
                <LogOut
                  size={22}
                  className="text-gray/40 group-hover/sidenav:text-gray/60  transition-colors rotate-180"
                />
              </button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10}>
            Logout
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default SidenavDesktop;
