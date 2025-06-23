import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

export const ExpandableTextarea = ({
  placeholder,
  className,
  value,
  onChange,
  styles,
  minHeight,
  ...props
}) => {
  const [height, setHeight] = useState(24);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.max(minHeight, scrollHeight);
      setHeight(newHeight);

      if (!value) {
        setHeight(24);
      }
    }
  }, [value, textareaRef.current]);

  return (
    <textarea
      placeholder={placeholder}
      className={cn(
        "resize-none bg-transparent outline-none text-sm text-gray block",
        className
      )}
      ref={textareaRef}
      value={value}
      onChange={onChange}
      style={{
        height: `${height}px`,
        width: "100%",
        minHeight: `${minHeight}px`,
        overflow: "hidden",
        ...styles,
      }}
      {...props}
    />
  );
};
