import { GAP_BETWEEN_SCREEN } from "@/constants";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const clampX = (x, contentWidth) => {
  const windowWidth = window.innerWidth;

  return Math.min(
    Math.max(x, GAP_BETWEEN_SCREEN),
    windowWidth - contentWidth - GAP_BETWEEN_SCREEN
  );
};

export const clampY = (y, contentHeight) => {
  const windowHeight = window.innerHeight;

  return Math.min(
    Math.max(y, GAP_BETWEEN_SCREEN),
    windowHeight - contentHeight - GAP_BETWEEN_SCREEN
  );
};
