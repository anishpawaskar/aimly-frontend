import { CalendarDays } from "lucide-react";
import {
  PopoverMenu,
  PopoverMenuAction,
  PopoverMenuCancel,
  PopoverMenuContent,
  PopoverMenuFooter,
  PopoverMenuTrigger,
} from "../primitive/popover-menu";
import { IconButton } from "../primitive/icon-button";
import { useState } from "react";

const DatePicker = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PopoverMenu open={isOpen} onOpenChange={setIsOpen}>
      <PopoverMenuTrigger asChild>
        <IconButton variant={"ghost"} className={"border-none h-7 w-7 p-0"}>
          <CalendarDays size={16} className="text-gray/40" />
        </IconButton>
      </PopoverMenuTrigger>
      <PopoverMenuContent className={"w-64"}>
        <div>
          <h3 className="text0lg text-gray font-semibold break-words text-center">
            Date
          </h3>
        </div>
        <PopoverMenuFooter>
          <PopoverMenuCancel className={"h-8 w-full"}>Cancel</PopoverMenuCancel>
          <PopoverMenuAction asChild>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="h-8 w-full"
            >
              Ok
            </button>
          </PopoverMenuAction>
        </PopoverMenuFooter>
      </PopoverMenuContent>
    </PopoverMenu>
  );
};

export default DatePicker;
