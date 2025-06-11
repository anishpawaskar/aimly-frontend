import { Children, cloneElement, isValidElement } from "react";

export const Slot = ({ children, ...props }) => {
  const element = Children.only(children);

  if (!isValidElement(element)) {
    return <>{children}</>;
  }

  const mergedProps = {
    ...props,
    ...element.props,
  };

  return cloneElement(element, mergedProps);
};
