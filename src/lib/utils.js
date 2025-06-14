import {
  BASE_INTERVAL,
  GAP_BETWEEN_SCREEN,
  NETURAL_INTERVAL,
} from "@/constants";
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

export const validateInputs = (values, defaultErrors) => {
  const errors = {};

  for (const key in values) {
    if (values[key]) {
      errors[key] = "";
    } else {
      errors[key] = defaultErrors[key];
    }
  }

  return errors;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export const generateSortOrder = ({ items }) => {
  const minSortOrder = items.reduce((acc, curr) => {
    return Math.min(acc, curr.sortOrder);
  }, Infinity);

  const newSortOrder = isFinite(minSortOrder)
    ? minSortOrder - BASE_INTERVAL
    : -BASE_INTERVAL;

  return newSortOrder;
};

export const moveToBottomSortOrder = ({ items, itemId }) => {
  const filteredItems = items.filter((item) => item._id !== itemId);

  const positiveSorts = filteredItems
    .map((item) => item.sortOrder)
    .filter((value) => value >= 0);

  let newSortOrder;

  if (!positiveSorts.length) {
    newSortOrder = NETURAL_INTERVAL;
  } else {
    const maxPositionValue = Math.max(...positiveSorts);
    newSortOrder = maxPositionValue + BASE_INTERVAL;
  }

  return newSortOrder;
};

export const moveToTopSortOrder = ({ items }) => {
  const minSortOrder = items.reduce((acc, curr) => {
    return Math.min(acc, curr.sortOrder);
  }, Infinity);

  const newSortOrder = isFinite(minSortOrder)
    ? minSortOrder - BASE_INTERVAL
    : -BASE_INTERVAL;

  return newSortOrder;
};

export const moveToMiddleSortOrder = ({ items, beforeItemId, afterItemId }) => {
  const beforeItem = items.find((item) => item._id === beforeItemId);
  const afterItem = items.find((item) => item._id === afterItemId);

  if (!beforeItem || !afterItem) {
    throw new Error("Before or after task is not found.");
  }

  const beforeSortOrder = beforeItem.sortOrder;
  const afterSortOrder = afterItem.sortOrder;

  return (beforeSortOrder + afterSortOrder) / 2;
};
