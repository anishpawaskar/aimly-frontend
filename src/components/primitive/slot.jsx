import { cn } from "@/lib/utils";
import { Children, cloneElement, isValidElement } from "react";

export const Slot = ({ children, ...props }) => {
  const element = Children.only(children);

  if (!isValidElement(element)) {
    return <>{children}</>;
  }

  let elementClassName;

  if (typeof element.props.className === "function") {
    elementClassName = element.props.className();
  } else {
    elementClassName = element.props.className;
  }

  const mergedProps = {
    ...props,
    ...element.props,
    className: cn(props.className, elementClassName),
  };

  return cloneElement(element, mergedProps);
};
