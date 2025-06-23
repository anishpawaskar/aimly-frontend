import { Square } from "lucide-react";
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "../common/date-picker";
import { useState } from "react";
import {
  PriorityMenu,
  PriorityMenuContent,
  PriorityMenuTrigger,
} from "../tasks/priority-menu";

export const UpdateTaskForm = () => {
  const [date, setDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [priority, setPriority] = useState(0);

  return (
    <div className="update-task-form h-full w-full flex flex-col">
      <div className="update-task-form-header flex items-center justify-between border-b border-gray/10 px-5 py-2.5">
        <div className="header-action-left flex items-center gap-1">
          <button className="flex items-center justify-center">
            <Square size={16} className="text-gray/40" />
          </button>
          <span>|</span>
          <DatePicker
            open={isCalendarOpen}
            setOpen={setIsCalendarOpen}
            date={date}
            setDate={setDate}
          >
            <DatePickerTrigger />
            <DatePickerContent
              clearState={() => {
                setDate(null);
              }}
              onSelect={(date) => {
                setDate(date);
                setIsCalendarOpen(false);
              }}
            />
          </DatePicker>
        </div>
        <div className="header-action-right flex items-center">
          <PriorityMenu value={priority} onValueChange={setPriority}>
            <PriorityMenuTrigger className={"h-7 w-7"} />
            <PriorityMenuContent />
          </PriorityMenu>
        </div>
      </div>
    </div>
  );
};
