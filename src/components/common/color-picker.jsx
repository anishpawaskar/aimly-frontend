import { cn } from "@/lib/utils";

const COLORS_DATA = [
  {
    color: "",
    name: "Default",
  },
  {
    color: "#FF6161",
    name: "Red",
  },
  {
    color: "#FFAC38",
    name: "Yellow",
  },
  {
    color: "#FFD324",
    name: "Lemon",
  },
  {
    color: "#E6EA49",
    name: "Oliv",
  },
  {
    color: "#35D870",
    name: "Green",
  },
  {
    color: "#4CA1FF",
    name: "Blue",
  },
  {
    color: "#6E75F4",
    name: "Purple",
  },
];

export const ColorPicker = ({
  placeholder,
  selectedColor,
  handleColorPicker,
}) => {
  return (
    <div className="flex items-center">
      <p className="text-sm w-[40%] text-gray/50">{placeholder}</p>
      <div className="w-[60%] flex items-center gap-2 justify-evenly">
        {COLORS_DATA.map((color) => {
          const isSelected = selectedColor === color.color;

          // TODO: fix layout shift after adding outline
          if (!color.color) {
            return (
              <button
                key={color.name}
                className={cn(
                  "h-[18px] w-[18px] rounded-full border border-gray/30",
                  isSelected &&
                    "h-[14px] w-[14px] ring-2 ring-[var(--primary-color)] ring-offset-2 border-gray/10"
                )}
                onClick={() => handleColorPicker(color.color)}
              ></button>
            );
          }

          return (
            <button
              style={{ background: color.color }}
              className={cn(
                "h-[18px] w-[18px] rounded-full transition-all",
                isSelected &&
                  "h-[14px] w-[14px] ring-2 ring-[var(--primary-color)] ring-offset-2"
              )}
              onClick={() => handleColorPicker(color.color)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};
