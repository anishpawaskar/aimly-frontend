import { CALENDAR_WEEKS, THIS_MONTH, THIS_YEAR } from "@/constants";

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const month30Days = [4, 6, 9, 11];
  const isLeapYear = year % 4 === 0;

  return month === 2
    ? isLeapYear
      ? 29
      : 28
    : month30Days.includes(month)
    ? 30
    : 31;
};

export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return new Date(`${year}-${month}-1`).getDay() + 1;
};

export const isValidDate = (date) => {
  const isDate = Object.prototype.toString.call(date) === "[object Date]";
  const isValidDate = date && !isNaN(date.valueOf());

  return isDate && isValidDate;
};

export const isSameMonth = (date, baseDate = new Date()) => {
  if (!isValidDate(date) && isValidDate(baseDate)) {
    return false;
  }

  const baseDateMonth = baseDate.getMonth() + 1;
  const baseDateYear = baseDate.getFullYear();
  const dateMonth = date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return baseDateMonth === dateMonth && baseDateYear === dateYear;
};

export const isSameDay = (date, baseDate = new Date()) => {
  if (!isValidDate(date) && isValidDate(baseDate)) {
    return false;
  }

  const baseDateDay = baseDate.getDay() + 1;
  const baseDateMonth = baseDate.getMonth() + 1;
  const baseDateYear = baseDate.getFullYear();
  const dateDay = date.getDay() + 1;
  const dateMonth = date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return (
    baseDateDay === dateDay &&
    baseDateMonth === dateMonth &&
    baseDateYear === dateYear
  );
};

export const getPrevMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;
  return {
    month: prevMonth,
    year: prevMonthYear,
  };
};

export const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return {
    month: nextMonth,
    year: nextMonthYear,
  };
};

export const generateCalendar = (month = THIS_MONTH, year = THIS_YEAR) => {
  const monthsDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthsDays);

  const { month: prevMonth, year: prevMonthYear } = getPrevMonth(month, year);
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((_, idx) => {
    const day = idx + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonthYear, prevMonth, day];
  });

  const thisMonthDates = [...new Array(monthsDays)].map((_, idx) => {
    const day = idx + 1;
    return [year, month, day];
  });

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((_, idx) => {
    const day = idx + 1;
    return [nextMonthYear, nextMonth, day];
  });

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};

export const isToday = (date) => {
  if (!isValidDate(date)) {
    return false;
  }

  const baseDate = new Date();

  const baseDate_date = baseDate.getDate();
  const baseDateMonth = baseDate.getMonth() + 1;
  const baseDateYear = baseDate.getFullYear();
  const date_date = date.getDate();
  const dateMonth = date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return (
    baseDate_date === date_date &&
    baseDateMonth === dateMonth &&
    baseDateYear === dateYear
  );
};

export const isTomorrow = (date) => {
  if (!isValidDate(date)) {
    return false;
  }

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const inputDate = new Date(date);

  return (
    inputDate.getDate() === tomorrow.getDate() &&
    inputDate.getMonth() === tomorrow.getMonth() &&
    inputDate.getFullYear() === tomorrow.getFullYear()
  );
};

export const isDueDateExpired = (date) => {
  if (!isValidDate(date)) {
    return false;
  }

  const currentDate = new Date().valueOf();
  currentDate.setHours(0, 0, 0, 0);

  const inputDate = new Date(date).valueOf();
  inputDate.setHours(0, 0, 0, 0);

  return currentDate > inputDate;
};
