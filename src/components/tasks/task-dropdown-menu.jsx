import { createContext, useContext, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../primitive/dropdown-menu";
import {
  CalendarArrowUp,
  Ellipsis,
  Flag,
  Sun,
  Sunrise,
  Tag,
  Trash2,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../primitive/tooltip";
import { IconButton } from "../primitive/icon-button";
import { cn } from "@/lib/utils";
import { TagSelector, TagSelectorContent } from "../common/tag-selector";
import { Button } from "../primitive/button";

const DATE_OPTIONS = [
  {
    label: "Today",
    icon: Sun,
  },
  {
    label: "Tomorrow",
    icon: Sunrise,
  },
  {
    label: "Next Week",
    icon: CalendarArrowUp,
  },
];

const PRIORITIES = [
  {
    name: "High",
    value: 5,
    color: "text-priority-high",
    fillColor: "fill-priority-high",
  },
  {
    name: "Medium",
    value: 3,
    color: "text-priority-medium",
    fillColor: "fill-priority-medium",
  },
  {
    name: "Low",
    value: 1,
    color: "text-priority-low",
    fillColor: "fill-priority-low",
  },
  {
    name: "None",
    value: 0,
    color: "text-gray/60",
    fillColor: "fill-transparent",
  },
];

const TaskDropdownMenuContext = createContext(null);
const useTaskDropdownMenu = () => useContext(TaskDropdownMenuContext);

const TaskDropdownMenu = ({ task, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [tags, setTags] = useState(task.tags);

  const anchorRef = useRef(null);

  const contextValue = {
    task,
    isOpen,
    setIsOpen,
    isTagsOpen,
    setIsTagsOpen,
    tags,
    setTags,
    anchorRef,
  };

  return (
    <TaskDropdownMenuContext.Provider value={contextValue}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        {children}
      </DropdownMenu>
    </TaskDropdownMenuContext.Provider>
  );
};

const TaskDropdownMenuTrigger = () => {
  const { anchorRef } = useTaskDropdownMenu();

  return (
    <DropdownMenuTrigger ref={anchorRef} asChild>
      <button className="shrink-0 h-full sm:invisible sm:group-hover:visible">
        <Ellipsis size={16} className="text-gray/40" />
      </button>
    </DropdownMenuTrigger>
  );
};

const TaskDateOptions = () => {
  return (
    <div className="pt-2.5 pb-3.5">
      <p className="px-3 text-xs text-gray/40 mb-1">Date</p>
      <div className="px-1.5 w-full flex gap-3 items-center justify-between">
        {DATE_OPTIONS.map((option) => {
          const IconComponent = option.icon;

          return (
            <Tooltip key={option.label}>
              <TooltipTrigger>
                <IconButton
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => handleDateOption(option.label)}
                >
                  <IconComponent size={20} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>{option.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

// const TaskPrioritiesOptions = () => {
//   const { task } = useTaskDropdownMenu();
//   const [value, setValue] = useState(task?.priority);

//   return (
//     <div className="w-full flex gap-3 items-center justify-between">
//       {PRIORITIES.map((priority) => {
//         const isSelected = value === priority.value;

//         return (
//           <IconButton
//             variant={"ghost"}
//             className={cn(isSelected && "bg-primary/5")}
//             onClick={() => setValue(priority.value)}
//           >
//             <Flag
//               size={16}
//               className={cn(priority.color, priority.fillColor)}
//             />
//           </IconButton>
//         );
//       })}
//     </div>
//   );
// };

const TaskPrioritiesOptions = () => {
  const { task, setIsOpen } = useTaskDropdownMenu();
  const [value, setValue] = useState(task.priority);

  return (
    <>
      <DropdownMenuLabel className={"px-3 text-xs text-gray/40 mb-1"}>
        Priority
      </DropdownMenuLabel>
      <DropdownMenuRadioGroup
        value={value}
        onValueChange={setValue}
        className={"justify-between px-1.5"}
      >
        {PRIORITIES.map((priority) => {
          const isSelected = priority.value === value;

          return (
            <DropdownMenuRadioItem
              key={priority.value}
              value={priority.value}
              asChild
            >
              <IconButton
                variant={"ghost"}
                size={"sm"}
                className={cn("w-8", isSelected && "bg-primary/10")}
                onClick={() => {
                  setValue(priority.value);
                  setIsOpen(false);
                }}
              >
                <Flag
                  size={16}
                  className={cn(priority.color, priority.fillColor)}
                />
              </IconButton>
            </DropdownMenuRadioItem>
          );
        })}
      </DropdownMenuRadioGroup>
    </>
  );
};

const TaskTagSelector = () => {
  const { setIsOpen, setIsTagsOpen } = useTaskDropdownMenu();

  return (
    <DropdownMenuItem asChild>
      <Button
        variant={"ghost"}
        size={"full"}
        onClick={(e) => {
          setIsOpen(false);
          setIsTagsOpen(true);
        }}
        className={"justify-start h-8"}
      >
        <Tag size={16} className="text-gray/40 mr-1.5" />
        <span className="text-sm">Tags</span>
      </Button>
    </DropdownMenuItem>
  );
};

const TaskDeleteBtn = () => {
  const { task, setIsOpen } = useTaskDropdownMenu();

  const handleDelete = () => {
    console.log("Delete task", task._id);
    setIsOpen(false);
  };

  return (
    <DropdownMenuItem asChild>
      <Button
        variant={"destructive"}
        size={"full"}
        onClick={handleDelete}
        className={"h-8 justify-start"}
      >
        <Trash2 size={16} className="mr-1.5" />
        <span className="text-sm">Delete</span>
      </Button>
    </DropdownMenuItem>
  );
};

const TaskDropdownMenuContent = () => {
  const { isOpen, isTagsOpen, setIsTagsOpen, tags, setTags, anchorRef } =
    useTaskDropdownMenu();

  return (
    <>
      {isOpen && (
        <DropdownMenuContent className={"w-48"} sideOffset={0}>
          <TaskDateOptions />
          <TaskPrioritiesOptions />
          <DropdownMenuSeparator />
          <TaskTagSelector />
          <TaskDeleteBtn />
        </DropdownMenuContent>
      )}

      {isTagsOpen && (
        <TagSelector
          open={isTagsOpen}
          setOpen={setIsTagsOpen}
          tags={tags}
          setTags={setTags}
        >
          <TagSelectorContent
            sideoffset={0}
            anchorRef={anchorRef}
            handleTagSubmit={(selectedTag) => {
              setTags(selectedTag);
              setIsTagsOpen(false);
            }}
          />
        </TagSelector>
      )}
    </>
  );
};

export { TaskDropdownMenu, TaskDropdownMenuTrigger, TaskDropdownMenuContent };
