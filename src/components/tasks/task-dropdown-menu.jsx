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
  AlignJustify,
  CalendarArrowUp,
  Check,
  Ellipsis,
  Flag,
  FolderInput,
  Search,
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
import { PopoverMenu, PopoverMenuContent } from "../primitive/popover-menu";
import { Input } from "../primitive/input";

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

const TASK_MENU_OPTIONS = [
  {
    name: "Tags",
    icon: Tag,
  },
  {
    name: "Move to",
    icon: FolderInput,
  },
  {
    name: "Delete",
    icon: Trash2,
  },
];

const TaskDropdownMenuContext = createContext(null);
const useTaskDropdownMenu = () => useContext(TaskDropdownMenuContext);

const TaskDropdownMenu = ({ task, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [tags, setTags] = useState(task.tags);
  const [isMoveToProjectVisible, setIsMoveToProjectVisible] = useState(false);

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
    isMoveToProjectVisible,
    setIsMoveToProjectVisible,
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

const TaskDropdownMenuOptions = () => {
  const { task, setIsOpen, setIsTagsOpen, setIsMoveToProjectVisible } =
    useTaskDropdownMenu();

  const handleTaskOption = (optionName) => {
    switch (optionName) {
      case "Tags": {
        setIsOpen(false);
        setIsTagsOpen(true);
        break;
      }

      case "Move to": {
        setIsOpen(false);
        setIsMoveToProjectVisible(true);
        break;
      }

      case "Delete": {
        console.log("Delete task", task._id);
        setIsOpen(false);
        break;
      }
    }
  };

  return TASK_MENU_OPTIONS.map((option) => {
    const IconComponent = option.icon;
    const variant = option.name === "Delete" ? "destructive" : "ghost";

    return (
      <DropdownMenuItem key={option.name} asChild>
        <Button
          variant={variant}
          size={"full"}
          onClick={() => handleTaskOption(option.name)}
          className={"h-8 justify-start"}
        >
          <IconComponent size={16} className="mr-1.5" />
          <span className="text-sm">{option.name}</span>
        </Button>
      </DropdownMenuItem>
    );
  });
};

const TaskMoveProjectSelector = () => {
  const [search, setSearch] = useState("");

  const { isMoveToProjectVisible, setIsMoveToProjectVisible, anchorRef } =
    useTaskDropdownMenu();

  const handleMoveProject = (project) => {
    console.log("move to project", project.name);
    setIsMoveToProjectVisible(false);
  };

  return (
    <PopoverMenu
      open={isMoveToProjectVisible}
      onOpenChange={setIsMoveToProjectVisible}
    >
      <PopoverMenuContent
        sideOffset={0}
        className={"w-48 min-w-[150px]"}
        handleReset={() => {
          setSearch("");
        }}
        anchorRef={anchorRef}
      >
        <div className="search-bar w-full flex items-center h-8 border-b border-gray/10 px-1">
          <Search size={18} className="text-gray/40 shrink-0" />
          <Input
            placeholder={"Search"}
            className={"border-none h-full flex-1 focus:border-none"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul className="h-[300px] overflow-y-auto flex flex-col">
          {TASK_MENU_OPTIONS.map((project, idx) => {
            const isSelected = idx === 1;

            return (
              <li key={idx}>
                <Button
                  variant={"ghost"}
                  size={"full"}
                  className={"h-8 px-2 justify-between"}
                  onClick={() => handleMoveProject(project)}
                >
                  <span className="flex items-center flex-1 mr-0.5">
                    <AlignJustify
                      size={16}
                      className={cn(
                        "text-gray/40 shrink-0 mr-3",
                        isSelected && "text-primary"
                      )}
                    />
                    <span
                      className={cn(
                        "flex-1 text-xs text-gray truncate text-start",
                        isSelected && "text-primary"
                      )}
                    >
                      {project.name}
                    </span>
                  </span>
                  {isSelected && <Check size={16} className="text-primary" />}
                </Button>
              </li>
            );
          })}
        </ul>
      </PopoverMenuContent>
    </PopoverMenu>
  );
};

const TaskDropdownMenuContent = () => {
  const {
    isOpen,
    isTagsOpen,
    setIsTagsOpen,
    tags,
    setTags,
    anchorRef,
    isMoveToProjectVisible,
  } = useTaskDropdownMenu();

  return (
    <>
      {isOpen && (
        <DropdownMenuContent className={"w-48"} sideOffset={0}>
          <TaskDateOptions />
          <TaskPrioritiesOptions />
          <DropdownMenuSeparator />
          <TaskDropdownMenuOptions />
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
      {isMoveToProjectVisible && <TaskMoveProjectSelector />}
    </>
  );
};

export { TaskDropdownMenu, TaskDropdownMenuTrigger, TaskDropdownMenuContent };
