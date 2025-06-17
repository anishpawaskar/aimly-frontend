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

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [calendarView, setCalendarView] = useState("date");

  const monthsKeys = Object.keys(CALENDAR_MONTHS);

  const currentMonth = selectedDate?.month
    ? CALENDAR_MONTHS[monthsKeys[selectedDate?.month - 1]]
    : CALENDAR_MONTHS[monthsKeys[THIS_MONTH - 1]];
  const currentYear = selectedDate?.year ? selectedDate?.year : THIS_YEAR;

  const days = generateCalendar(selectedDate?.month, selectedDate?.year);
  const totalDaysInWeek = Object.keys(WEEK_DAYS).length;
  const totalMonthsInYear = Object.keys(CALENDAR_MONTHS).length;

  const handlePrevMonth = () => {
    const { month, year } = getPrevMonth(
      selectedDate?.month ?? THIS_MONTH,
      selectedDate?.year ?? THIS_YEAR
    );

    const payload = {};

    if (calendarView === "date") {
      payload.month = month;
      payload.year = year;
    } else {
      payload.year = year - 1;
    }

    setSelectedDate((prevState) => ({ ...prevState, ...payload }));
  };

  const handleCurrentMonth = () => {
    if (calendarView !== "date") return;
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

    if (calendarView === "date") {
      payload.month = month;
      payload.year = year;
    } else {
      payload.year = year + 1;
    }

    setSelectedDate((prevState) => ({ ...prevState, ...payload }));
  };

  const toggleCalendarView = () => {
    setCalendarView((prevState) => (prevState === "date" ? "month" : "date"));
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
                      currentDate: currentDate,
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
                      currentDate: tomorrowDate,
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
                      currentDate: nextWeekDate,
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
                      currentDate: nextMonthDate,
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
              <button
                className={"text-sm w-[70%] text-gray/80 text-start pl-1.5"}
                onClick={toggleCalendarView}
              >
                {calendarView === "date" && (
                  <span className="current-month mr-[2px]">{currentMonth}</span>
                )}
                <span className="current-year">{currentYear}</span>
              </button>
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
            <div className="calendar-body">
              {calendarView === "month" && (
                <ul className="flex flex-col">
                  {[...new Array(totalMonthsInYear / 4)].map((_, idx) => {
                    return (
                      <li
                        key={idx}
                        className="flex items-center justify-between"
                      >
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

                            const handleMonth = () => {
                              setSelectedDate((prevState) => ({
                                ...prevState,
                                month: monthIdx,
                              }));
                              setCalendarView("date");
                            };

                            return (
                              <button
                                key={month}
                                onClick={handleMonth}
                                className={cn(
                                  "h-8 w-8 rounded-full flex items-center justify-center text-gray text-[13px] leading-[32px]",
                                  isSelected &&
                                    "bg-primary text-primary-foreground",
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
              )}
              {calendarView === "date" && (
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
                      <li
                        key={idx}
                        className="flex items-center justify-between text-xs"
                      >
                        {days
                          .slice(
                            idx * totalDaysInWeek,
                            (idx + 1) * totalDaysInWeek
                          )
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
                              console.log(date_date, dateMonth, dateYear);

                              isSelectedDate =
                                date_date === date[date.length - 1] &&
                                dateMonth === date[1] &&
                                dateYear === date[0];
                            }

                            const handleDate = () => {
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
                              <button
                                key={date.join("-")}
                                className={cn(
                                  "h-7 w-7 flex items-center justify-center text-center rounded-full transition-colors",
                                  _isToday && "text-primary bg-primary/10",
                                  !isCurrentMonth && "text-gray/40",
                                  isSelectedDate &&
                                    "bg-primary text-primary-foreground",
                                  !_isToday &&
                                    !isSelectedDate &&
                                    "sm:hover:bg-cancel-btn-hover sm:active:bg-cancel-btn-active"
                                )}
                                onClick={handleDate}
                              >
                                {date[date.length - 1]}
                              </button>
                            );
                          })}
                      </li>
                    );
                  })}
                </ul>
              )}
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
