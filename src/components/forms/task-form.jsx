import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { ExpandableTextarea } from "../common/expandable-textarea";

export const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div
      className={cn(
        "border border-gray/10 rounded-md max-h-[200px] flex flex-col gap-1 transition-colors",
        isInputFocused && "border-primary"
      )}
    >
      <div className="max-h-[120px] overflow-y-auto px-3 pt-3">
        <ExpandableTextarea
          placeholder={"What would you like to do?"}
          className="mb-1"
          maxLength={160000}
          minHeight={24}
          styles={{
            lineHeight: "20px",
          }}
          value={formData.title}
          name={"title"}
          onChange={handleOnChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <ExpandableTextarea
          placeholder={"Description"}
          className="text-gray/70"
          maxLength={160000}
          minHeight={24}
          styles={{
            lineHeight: "20px",
          }}
          value={formData.content}
          name={"content"}
          onChange={handleOnChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </div>
    </div>
  );
};
