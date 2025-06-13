import {
  CalendarDays,
  ClipboardList,
  Command,
  MapPinCheckInside,
  Target,
  User,
} from "lucide-react";

export const SIDE_NAV_DATA = [
  {
    label: "Settings",
    icon: User,
    href: "/settings",
  },
  {
    label: "Tasks",
    icon: ClipboardList,
    href: "/tasks",
  },
  {
    label: "Calendar",
    icon: CalendarDays,
    href: "/calendar",
  },
  {
    label: "Pomodoro",
    icon: Target,
    href: "/pomodoro",
  },
  {
    label: "Eisenhower Matrix",
    icon: Command,
    href: "/matrix",
  },
  {
    label: "Habit Tracker",
    icon: MapPinCheckInside,
    href: "/habit",
  },
];
