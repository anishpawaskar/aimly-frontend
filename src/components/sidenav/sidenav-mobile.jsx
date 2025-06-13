import { Home, LogOut, Menu, X } from "lucide-react";
import { IconButton } from "../primitive/icon-button";
import { useTheme } from "@/context/theme-provider";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { SIDE_NAV_DATA } from "./sidenav.contant";

const SidenavMobile = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="sidenav-mobile">
      <div className="sidenav-header h-11 border-b border-gray/20 flex items-center justify-end px-4">
        <IconButton
          variant={"ghost"}
          size={"sm"}
          onClick={() => setIsSidenavOpen(true)}
        >
          <Menu size={26} className="text-gray/60" />
        </IconButton>
      </div>
      <div
        className={cn(
          "fixed inset-0 z-50 p-8 flex-col justify-between",
          "bg-white",
          // isLight ? "bg-white" : "sidenav-gradient-bg",
          isSidenavOpen ? "flex" : "hidden"
        )}
      >
        <ul className="sidenav-list flex flex-col gap-1">
          <li className="sidenav-list-item home-link w-full flex justify-between items-center mb-4">
            <Link
              to={"/"}
              className="flex items-center gap-2.5 py-2 group/sidenav flex-auto"
            >
              <Home
                size={22}
                className="text-gray/60 group-hover/sidenav:text-gray transition-colors"
              />
              <span className="text-sm">Home</span>
            </Link>
            <IconButton
              variant={"ghost"}
              className={"shrink-0 py-2"}
              onClick={() => setIsSidenavOpen(false)}
            >
              <X size={22} className="text-gray" />
            </IconButton>
          </li>
          {SIDE_NAV_DATA.map((sidenav) => {
            const IconComponent = sidenav.icon;

            return (
              <li key={sidenav.label} className="w-full">
                <NavLink
                  to={sidenav.href}
                  className={"flex items-center gap-2.5 py-2"}
                >
                  {({ isActive }) => (
                    <>
                      <IconComponent
                        size={22}
                        className={cn(
                          isActive ? "text-primary" : "text-gray/60"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm",
                          isActive ? "text-primary" : "text-gray/60"
                        )}
                      >
                        {sidenav.label}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div>
          <Link to={"/"} reloadDocument className="w-full py-2">
            <button className="h-full w-full flex items-center gap-2.5">
              <LogOut size={22} className="text-gray/60 rotate-180" />
              <span className="text-sm text-gray">Logout</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidenavMobile;
