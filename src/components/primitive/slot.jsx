import { cn } from "@/lib/utils";
import { Children, cloneElement, isValidElement } from "react";

export const Slot = ({ children, ...props }) => {
  const element = Children.only(children);

  if (!isValidElement(element)) {
    return <>{children}</>;
  }

  const mergedProps = {
    ...props,
    ...element.props,
    className: cn(props.className, element.props.className),
  };

  return cloneElement(element, mergedProps);
};
