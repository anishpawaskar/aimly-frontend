import { cn } from "@/lib/utils";
import { useState } from "react";
import { ExpandableTextarea } from "../common/expandable-textarea";
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "../common/date-picker";
import {
  PriorityMenu,
  PriorityMenuContent,
  PriorityMenuTrigger,
} from "../tasks/priority-menu";
import { Button } from "../primitive/button";

export const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState(0);

  const isAddBtnDisabled = formData.title === "" && formData.content === "";

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("submit form");
  };

  return (
    <div
      className={cn(
        "border border-gray/10 rounded-md max-h-[200px] flex flex-col gap-1 transition-colors",
        isInputFocused && "border-primary"
      )}
    >
      <div className="max-h-[120px] overflow-y-auto px-3 pt-3">
        <ExpandableTextarea
          placeholder={"What would you like to do?"}
          className="mb-1"
          maxLength={160000}
          minHeight={24}
          styles={{
            lineHeight: "20px",
          }}
          value={formData.title}
          name={"title"}
          onChange={handleOnChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <ExpandableTextarea
          placeholder={"Description"}
          className="text-gray/70"
          maxLength={160000}
          minHeight={24}
          styles={{
            lineHeight: "20px",
          }}
          value={formData.content}
          name={"content"}
          onChange={handleOnChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </div>
      <div className="task-form-footer flex items-center justify-between pl-1.5 pr-3 pb-1.5">
        <div className="task-form-actions flex items-center">
          <DatePicker
            date={date}
            open={isCalendarOpen}
            setDate={setDate}
            setOpen={setIsCalendarOpen}
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
          <PriorityMenu value={priority} onValueChange={setPriority}>
            <PriorityMenuTrigger className={"h-7 w-7"} />
            <PriorityMenuContent />
          </PriorityMenu>
        </div>
        <Button
          size={"xs"}
          variant={"primary"}
          className={"text-xs"}
          disabled={isAddBtnDisabled}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </div>
    </div>
  );
};
