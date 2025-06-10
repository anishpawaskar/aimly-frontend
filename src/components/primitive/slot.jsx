import { Children, cloneElement, isValidElement } from "react";

export const Slot = ({ children, ...props }) => {
  const element = Children.only(children);

  if (isValidElement(element)) {
    return cloneElement(element, props);
  }

  return <>{children}</>;
};
