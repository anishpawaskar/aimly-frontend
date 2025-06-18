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
import {
  createContext,
  useContext,
  useEffect,
  useInsertionEffect,
  useRef,
  useState,
} from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../primitive/tooltip";
import {
  CALENDAR_MONTHS,
  CALENDAR_WEEKS,
  ONE_DAY_MS,
  ONE_MONTH_MS,
  ONE_WEEK_MS,
  THIS_MONTH,
  THIS_YEAR,
  WEEK_DAYS,
} from "@/constants";
import {
  generateCalendar,
  getNextMonth,
  getPrevMonth,
  isToday,
} from "@/lib/date-picker.helper";
import { cn } from "@/lib/utils";

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

const DatePickerContext = createContext(null);
const useDatePicker = () => useContext(DatePickerContext);

const DatePicker = ({ setDate, open, setOpen, date, children }) => {
  // const [open, setOpen] = useState(false);
  const [view, setView] = useState("days");
  const [selectedDate, setSelectedDate] = useState(null);

  const contextValue = {
    open,
    setOpen,
    view,
    setView,
    selectedDate,
    setSelectedDate,
    date,
    setDate,
  };

  return (
    <DatePickerContext.Provider value={contextValue}>
      <PopoverMenu open={open} onOpenChange={setOpen}>
        {children}
      </PopoverMenu>
    </DatePickerContext.Provider>
  );
};

const DatePickerTrigger = ({ className }) => {
  const { selectedDate, date } = useDatePicker();
  // console.log("trigger", date);
  let datePlaceHolder;

  if (selectedDate || date) {
    const currentDate = selectedDate?.currentDate?.getDate() || date?.getDate();
    const tomorrowDate = new Date().getDate() + 1;

    if (currentDate === tomorrowDate) {
      datePlaceHolder = "Tomorrow";
    } else {
      let monthKey;
      if (selectedDate?.month) {
        monthKey = Object.keys(CALENDAR_MONTHS)[selectedDate.month - 1];
      } else {
        monthKey = Object.keys(CALENDAR_MONTHS)[date?.getMonth()];
      }

      datePlaceHolder = `${
        selectedDate?.currentDate?.getDate() || date?.getDate()
      } ${CALENDAR_MONTHS[monthKey]}`;
    }
  }

  return (
    <PopoverMenuTrigger asChild={true}>
      <IconButton
        variant={"ghost"}
        className={cn(
          "border-none h-7 w-7 p-0",
          (date || selectedDate) &&
            "text-primary flex items-center gap-1 w-auto px-2",
          className
        )}
      >
        <CalendarDays
          size={16}
          className={cn(
            "text-gray/40",
            (date || selectedDate) && "text-primary"
          )}
        />
        {(date || selectedDate) && (
          <span className="text-xs text-primary">{datePlaceHolder}</span>
        )}
      </IconButton>
    </PopoverMenuTrigger>
  );
};

const DatePickerHeader = () => {
  return (
    <h3 className="text-lg text-gray font-semibold break-words text-center">
      Date
    </h3>
  );
};

const DatePickerQuickDates = () => {
  const { setSelectedDate, setOpen, setView, setDate } = useDatePicker();

  const handleDateOption = (option) => {
    const _date = new Date();
    let currentDate;
    let month;
    let year;

    switch (option) {
      case "Today": {
        currentDate = _date;
        break;
      }

      case "Tomorrow": {
        currentDate = new Date(_date.valueOf() + ONE_DAY_MS);
        break;
      }

      case "Next Week": {
        currentDate = new Date(_date.valueOf() + ONE_WEEK_MS);
        break;
      }

      case "Next Month": {
        currentDate = new Date(_date.valueOf() + ONE_MONTH_MS);
        break;
      }
    }

    month = currentDate.getMonth() + 1;
    year = currentDate.getFullYear();

    setSelectedDate({
      currentDate,
      month,
      year,
    });
    setDate(currentDate);
    setOpen(false);
    setView("days");
  };
  return (
    <ul className="w-full flex gap-3 items-center justify-between">
      {DATE_OPTIONS.map((option) => {
        const IconComponent = option.icon;

        return (
          <Tooltip key={option.label}>
            <TooltipTrigger>
              <IconButton
                variant={"ghost"}
                size={"sm"}
                onClick={() => handleDateOption(option.label)}
              >
                <IconComponent size={20} />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent>{option.label}</TooltipContent>
          </Tooltip>
        );
      })}
    </ul>
  );
};

const DatePickerControls = () => {
  const { view, setView, selectedDate, setSelectedDate } = useDatePicker();

  const monthsKeys = Object.keys(CALENDAR_MONTHS);

  const currentMonth = selectedDate?.month
    ? CALENDAR_MONTHS[monthsKeys[selectedDate?.month - 1]]
    : CALENDAR_MONTHS[monthsKeys[THIS_MONTH - 1]];
  const currentYear = selectedDate?.year ? selectedDate?.year : THIS_YEAR;

  const toggleCalendarView = () => {
    setView((prevState) => (prevState === "days" ? "months" : "days"));
  };

  const handlePrevMonth = () => {
    const { month, year } = getPrevMonth(
      selectedDate?.month ?? THIS_MONTH,
      selectedDate?.year ?? THIS_YEAR
    );

    const payload = {};

    if (view === "days") {
      payload.month = month;
      payload.year = year;
    } else {
      payload.year = year - 1;
    }

    setSelectedDate((prevState) => ({ ...prevState, ...payload }));
  };

  const handleCurrentMonth = () => {
    if (view !== "days") return;
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

    const payload = {};

    if (view === "days") {
      payload.month = month;
      payload.year = year;
    } else {
      payload.year = year + 1;
    }

    setSelectedDate((prevState) => ({ ...prevState, ...payload }));
  };

  return (
    <div className="date-picker-controls flex items-center justify-between gap-2.5">
      <button
        onClick={toggleCalendarView}
        className="text-sm w-[70%] text-gray/80 text-start pl-1.5"
      >
        {view === "days" && (
          <span className="current-month mr-[2px]">{currentMonth}</span>
        )}
        <span className="current-year">{currentYear}</span>
      </button>
      <div className="w-[30%] flex items-center gap-0.5">
        <IconButton variant={"ghost"} size={"xs"} onClick={handlePrevMonth}>
          <ChevronLeft size={16} className="text-gray/40" />
        </IconButton>
        <button
          onClick={handleCurrentMonth}
          className="h-6 w-6 flex items-center justify-center rounded-md"
        >
          <Circle size={10} className="text-gray/40" />
        </button>
        <IconButton variant={"ghost"} size={"xs"} onClick={handleNextMonth}>
          <ChevronRight size={16} className="text-gray/40" />
        </IconButton>
      </div>
    </div>
  );
};

const DatePickerDaysView = () => {
  const { selectedDate, setSelectedDate } = useDatePicker();
  const days = generateCalendar(selectedDate?.month, selectedDate?.year);
  const totalDaysInWeek = Object.keys(WEEK_DAYS).length;

  const handleDate = (date) => {
    const _date = new Date(date.join("-"));
    const month = _date.getMonth() + 1;
    const year = _date.getFullYear();

    setSelectedDate((prevState) => ({
      ...prevState,
      currentDate: _date,
      month,
      year,
    }));
  };

  return (
    <ul className="flex flex-col">
      <li className="calendar-weeks flex items-center justify-between text-xs">
        {Object.keys(WEEK_DAYS).map((day) => {
          return (
            <span
              key={day}
              className="h-7 w-7 flex items-center justify-center text-gray/40 text-center"
            >
              {WEEK_DAYS[day][0]}
            </span>
          );
        })}
      </li>
      {[...new Array(CALENDAR_WEEKS)].map((_, idx) => {
        return (
          <li key={idx} className="flex items-center justify-between text-xs">
            {days
              .slice(idx * totalDaysInWeek, (idx + 1) * totalDaysInWeek)
              .map((date) => {
                const _date = new Date(date.join("-"));
                const _isToday = isToday(_date);
                const isCurrentMonth = selectedDate?.month
                  ? date[1] === selectedDate?.month
                  : date[1] === THIS_MONTH;

                let isSelectedDate = false;

                if (selectedDate?.currentDate) {
                  const _date = new Date(selectedDate?.currentDate);
                  const date_date = _date.getDate();
                  const dateMonth = _date.getMonth() + 1;
                  const dateYear = _date.getFullYear();

                  isSelectedDate =
                    date_date === date[date.length - 1] &&
                    dateMonth === date[1] &&
                    dateYear === date[0];
                }

                return (
                  <button
                    key={date.join("-")}
                    className={cn(
                      "h-7 w-7 flex items-center justify-center text-center rounded-full transition-colors",
                      _isToday && "text-primary bg-primary/10",
                      !isCurrentMonth && "text-gray/40",
                      isSelectedDate && "bg-primary text-primary-foreground",
                      !_isToday &&
                        !isSelectedDate &&
                        "sm:hover:bg-cancel-btn-hover sm:active:bg-cancel-btn-active"
                    )}
                    onClick={() => handleDate(date)}
                  >
                    {date[date.length - 1]}
                  </button>
                );
              })}
          </li>
        );
      })}
    </ul>
  );
};

const DatePickerMonthsView = () => {
  const { selectedDate, setSelectedDate, setView } = useDatePicker();
  const totalMonthsInYear = Object.keys(CALENDAR_MONTHS).length;

  const handleMonth = (month) => {
    setSelectedDate((prevState) => ({ ...prevState, month }));
    setView("days");
  };

  return (
    <ul className="flex flex-col">
      {[...new Array(totalMonthsInYear / 4)].map((_, idx) => {
        return (
          <li key={idx} className="flex items-center justify-between">
            {Object.keys(CALENDAR_MONTHS)
              .slice(
                idx * (totalMonthsInYear / 3),
                (idx + 1) * (totalMonthsInYear / 3)
              )
              .map((month) => {
                const monthIdx =
                  Object.keys(CALENDAR_MONTHS).indexOf(month) + 1;

                const isSelected = selectedDate?.month
                  ? selectedDate?.month === monthIdx
                  : THIS_MONTH === monthIdx;

                return (
                  <button
                    key={month}
                    onClick={() => handleMonth(monthIdx)}
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center text-gray text-[13px] leading-[32px]",
                      isSelected && "bg-primary text-primary-foreground",
                      !isSelected && "sm:hover:bg-primary/20"
                    )}
                  >
                    {CALENDAR_MONTHS[month]}
                  </button>
                );
              })}
          </li>
        );
      })}
    </ul>
  );
};

const DatePickerCalendar = () => {
  const { view } = useDatePicker();

  return (
    <div className="calendar">
      <DatePickerControls />
      {view === "days" ? <DatePickerDaysView /> : <DatePickerMonthsView />}
    </div>
  );
};

const DatePickerFooter = ({ clearState, onSelect }) => {
  const { setView, setOpen, selectedDate, setSelectedDate } = useDatePicker();

  const handleCancel = () => {
    setSelectedDate(null);
    setView("days");
    setOpen(false);
    if (clearState) {
      clearState();
    }
  };

  const handleSubmit = () => {
    onSelect(selectedDate?.currentDate ?? null);
  };

  return (
    <PopoverMenuFooter>
      <PopoverMenuCancel className={"h-8 w-full"} asChild>
        <button onClick={handleCancel}>Cancel</button>
      </PopoverMenuCancel>
      <PopoverMenuAction asChild>
        <button className="h-8 w-full" onClick={handleSubmit}>
          Ok
        </button>
      </PopoverMenuAction>
    </PopoverMenuFooter>
  );
};

const DatePickerContent = ({
  className,
  side,
  sideOffset,
  align,
  alignOffset,
  clearState,
  onSelect,
}) => {
  const { open, date, setSelectedDate, setView } = useDatePicker();

  const handleClick = () => {
    if (!date) {
      setSelectedDate(null);
    } else {
      setSelectedDate({
        currentDate: date,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }
    setView("days");
  };

  if (!open) {
    return null;
  }

  return (
    <PopoverMenuContent
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      className={className}
      handleReset={handleClick}
    >
      <DatePickerHeader />
      <DatePickerQuickDates />
      <DatePickerCalendar />
      <DatePickerFooter clearState={clearState} onSelect={onSelect} />
    </PopoverMenuContent>
  );
};

export { DatePicker, DatePickerTrigger, DatePickerContent };
