import {
  CalendarArrowUp,
  CalendarDays,
  CalendarFold,
  ChevronLeft,
  ChevronRight,
  Circle,
  Sun,
  Sunrise,
} from "lucide-react";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "../primitive/tooltip";
import {
  CALENDAR_MONTHS,
  ONE_DAY_MS,
  ONE_MONTH_MS,
  ONE_WEEK_MS,
  THIS_MONTH,
  THIS_YEAR,
} from "@/constants";
import { getNextMonth, getPrevMonth } from "@/lib/date-picker.helper";

const DATE_OPTIONS = [
  {
    label: "Today",
    icon: Sun,
  },
  {
    label: "Tomorrow",
    icon: Sunrise,
  },
  {
    label: "Next Week",
    icon: CalendarArrowUp,
  },
  {
    label: "Next Month",
    icon: CalendarFold,
  },
];

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const monthsKeys = Object.keys(CALENDAR_MONTHS);
  console.log("selected month", selectedDate);

  const currentMonth = selectedDate?.month
    ? CALENDAR_MONTHS[monthsKeys[selectedDate?.month - 1]]
    : CALENDAR_MONTHS[monthsKeys[THIS_MONTH - 1]];
  const currentYear = selectedDate?.year ? selectedDate?.year : THIS_YEAR;

  const handlePrevMonth = () => {
    const { month, year } = getPrevMonth(
      selectedDate?.month ?? THIS_MONTH,
      selectedDate?.year ?? THIS_YEAR
    );

    setSelectedDate((prevState) => ({ ...prevState, month, year }));
  };

  const handleCurrentMonth = () => {
    setSelectedDate((prevState) => ({
      ...prevState,
      month: THIS_MONTH,
      year: THIS_YEAR,
    }));
  };

  const handleNextMonth = () => {
    const { month, year } = getNextMonth(
      selectedDate?.month ?? THIS_MONTH,
      selectedDate?.year ?? THIS_YEAR
    );

    setSelectedDate((prevState) => ({ ...prevState, month, year }));
  };

  return (
    <PopoverMenu open={isOpen} onOpenChange={setIsOpen}>
      <PopoverMenuTrigger asChild>
        <IconButton variant={"ghost"} className={"border-none h-7 w-7 p-0"}>
          <CalendarDays size={16} className="text-gray/40" />
        </IconButton>
      </PopoverMenuTrigger>
      <PopoverMenuContent className={"w-64"}>
        <div>
          <h3 className="text-lg text-gray font-semibold break-words text-center">
            Date
          </h3>
          <ul className="w-full flex gap-3 items-center justify-between">
            {DATE_OPTIONS.map((dateOption) => {
              const IconComponent = dateOption.icon;

              const handleDateOptiom = (option) => {
                const currentDate = new Date();

                switch (option) {
                  case "Today": {
                    const currentMonth = THIS_MONTH;
                    const currentYear = THIS_YEAR;

                    setSelectedDate({
                      currentDate: currentDate.toISOString(),
                      month: currentMonth,
                      year: currentYear,
                    });
                    break;
                  }

                  case "Tomorrow": {
                    const tomorrowDate = new Date(
                      currentDate.valueOf() + ONE_DAY_MS
                    );
                    const tomorrowDateMonth = tomorrowDate.getMonth() + 1;
                    const tomorrowDateYear = tomorrowDate.getFullYear();

                    setSelectedDate({
                      currentDate: tomorrowDate.toISOString(),
                      month: tomorrowDateMonth,
                      year: tomorrowDateYear,
                    });
                    break;
                  }

                  case "Next Week": {
                    const nextWeekDate = new Date(
                      currentDate.valueOf() + ONE_WEEK_MS
                    );
                    const nextWeekMonth = nextWeekDate.getMonth() + 1;
                    const nextWeekYear = nextWeekDate.getFullYear();

                    setSelectedDate({
                      currentDate: nextWeekDate.toISOString(),
                      month: nextWeekMonth,
                      year: nextWeekYear,
                    });
                    break;
                  }

                  case "Next Month": {
                    const nextMonthDate = new Date(
                      currentDate.valueOf() + ONE_MONTH_MS
                    );
                    const nextMonth_Month = nextMonthDate.getMonth() + 1;
                    const nextMonth_Year = nextMonthDate.getFullYear();

                    setSelectedDate({
                      currentDate: nextMonthDate.toISOString(),
                      month: nextMonth_Month,
                      year: nextMonth_Year,
                    });
                    break;
                  }
                }
              };

              return (
                <Tooltip key={dateOption.label}>
                  <TooltipTrigger>
                    <IconButton
                      variant={"ghost"}
                      size={"sm"}
                      className={"bg-red-300"}
                      onClick={() => handleDateOptiom(dateOption.label)}
                    >
                      <IconComponent size={20} />
                    </IconButton>
                  </TooltipTrigger>
                  <TooltipContent>{dateOption.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </ul>
          <div className="calendar-wrapper">
            <div className="calendar-header flex items-center justify-between gap-2.5">
              <p className="text-sm w-[70%] text-gray/80">
                <span className="current-month mr-[2px]">{currentMonth}</span>
                <span className="current-year">{currentYear}</span>
              </p>
              <div className="w-[30%] flex items-center gap-0.5">
                <IconButton
                  variant={"ghost"}
                  size={"xs"}
                  onClick={handlePrevMonth}
                >
                  <ChevronLeft size={16} className="text-gray/40" />
                </IconButton>
                <button
                  onClick={handleCurrentMonth}
                  className="h-6 w-6 flex items-center justify-center rounded-md"
                >
                  <Circle size={10} className="text-gray/40" />
                </button>
                <IconButton
                  variant={"ghost"}
                  size={"xs"}
                  onClick={handleNextMonth}
                >
                  <ChevronRight size={16} className="text-gray/40" />
                </IconButton>
              </div>
            </div>
          </div>
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
