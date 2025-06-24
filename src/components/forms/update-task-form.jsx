import {
  Ellipsis,
  FolderSymlink,
  Icon,
  Square,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "../common/date-picker";
import { useRef, useState } from "react";
import {
  PriorityMenu,
  PriorityMenuContent,
  PriorityMenuTrigger,
} from "../tasks/priority-menu";
import { ExpandableTextarea } from "../common/expandable-textarea";
import { TASKS_DATA } from "../tasks/tasks.constant";
import { Link, useLocation, useNavigate } from "react-router";
import { TagSelect } from "../tasks/tags/tag-select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../primitive/tooltip";
import {
  PopoverMenu,
  PopoverMenuContent,
  PopoverMenuTrigger,
} from "../primitive/popover-menu";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../primitive/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../primitive/dropdown-menu";
import { IconButton } from "../primitive/icon-button";
import { TagSelector, TagSelectorContent } from "../common/tag-selector";

const MENU_OPTIONS = [
  {
    name: "Tags",
    icon: Tag,
  },
  {
    name: "Delete",
    icon: Trash2,
  },
];

export const UpdateTaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [priority, setPriority] = useState(0);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  const anchorRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const task = TASKS_DATA.find((task) => task._id === 1);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFromData) => ({ ...prevFromData, [name]: value }));
  };

  return (
    <>
      <div className="update-task-form h-full w-full flex flex-col">
        <div className="update-task-form-header shrink-0 flex items-center justify-between border-b border-gray/10 px-5 py-2.5">
          <div className="header-action-left flex items-center gap-1">
            <button className="flex items-center justify-center">
              <Square size={16} className="text-gray/40" />
            </button>
            <span>|</span>
            <DatePicker
              open={isCalendarOpen}
              setOpen={setIsCalendarOpen}
              date={date}
              setDate={setDate}
            >
              <DatePickerTrigger />
              <DatePickerContent
                clearState={() => {
                  setDate(null);
                }}
                onSelect={(date) => {
                  setDate(date);
                  setIsCalendarOpen(false);
                }}
              />
            </DatePicker>
          </div>
          <div className="header-action-right flex items-center">
            <PriorityMenu value={priority} onValueChange={setPriority}>
              <PriorityMenuTrigger className={"h-7 w-7"} />
              <PriorityMenuContent />
            </PriorityMenu>
          </div>
        </div>
        <div className="update-task-form-body px-5 py-3 overflow-y-auto flex-1 flex flex-col gap-3">
          <input
            placeholder="What would you like to do?"
            value={formData.title}
            className="font-medium w-full outline-none border-none"
            name="title"
            onChange={handleOnChange}
          />
          <div className="form-description w-full">
            <ExpandableTextarea
              minHeight={80}
              placeholder={"Write something"}
              value={formData.content}
              name={"content"}
              className={"border border-gray/10 rounded-md p-2 "}
              onChange={handleOnChange}
            />
          </div>
          {!!task.tags.length && (
            <div className="flex items-center gap-2.5 flex-wrap">
              {task.tags.map((tag) => {
                const styleObj = {};

                if (tag.color) {
                  styleObj.background = tag.color;
                }

                const handleRemoveTag = (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  console.log("remove tag", tag._id);
                };

                return (
                  <Link
                    key={tag._id}
                    to={`/tags/${tag._id}/tasks`}
                    style={styleObj}
                    className="rounded-full relative text-xs h-5 px-2 max-w-[88px] flex items-center justify-center group"
                  >
                    <span className="w-full truncate">{tag.name}</span>
                    <button
                      onClick={handleRemoveTag}
                      className="absolute -top-2 -right-2 bg-gray/60 text-white rounded-full h-4 w-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </Link>
                );
              })}
              <TagSelect taskId={task._id} tags={task.tags} />
            </div>
          )}
        </div>
        <div className="update-task-form-footer shrink-0 flex items-center justify-between pl-3 pr-5 py-2.5">
          <div className="footer-action-left flex items-center justify-center">
            <PopoverMenu
              open={isProjectsVisible}
              onOpenChange={setIsProjectsVisible}
            >
              <PopoverMenuTrigger asChild>
                <button
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      isDisabled: false,
                      size: "sm",
                    }),
                    "border-none px-2"
                  )}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center text-xs">
                        <FolderSymlink
                          size={16}
                          className="text-gray/40 mr-1.5"
                        />
                        Project Name
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Hello world</TooltipContent>
                  </Tooltip>
                </button>
              </PopoverMenuTrigger>
              <PopoverMenuContent>Hello</PopoverMenuContent>
            </PopoverMenu>
          </div>
          <div className="footer-action-right flex items-center justify-center">
            <DropdownMenu
              open={isOptionsVisible}
              onOpenChange={setIsOptionsVisible}
            >
              <DropdownMenuTrigger ref={anchorRef} asChild>
                <IconButton variant={"ghost"} size={"sm"}>
                  <Ellipsis size={16} className="text-gray/40" />
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top">
                {MENU_OPTIONS.map((option) => {
                  const IconComponent = option.icon;
                  const variant =
                    option.name === "Delete" ? "destructive" : "ghost";

                  const handleOption = () => {
                    switch (option.name) {
                      case "Tags": {
                        setIsOptionsVisible(false);
                        setIsTagsOpen(true);
                        break;
                      }

                      case "Delete": {
                        console.log("Delete task", task._id);
                        const splittedPath = location.pathname.split("/");
                        const path = splittedPath.slice(
                          0,
                          splittedPath.length - 1
                        );
                        navigate({
                          pathname: path.join("/"),
                        });
                        setIsOptionsVisible(false);
                        break;
                      }
                    }
                  };

                  return (
                    <DropdownMenuItem key={option.name} asChild>
                      <Button
                        variant={variant}
                        size={"full"}
                        onClick={handleOption}
                        className={"h-8 justify-start"}
                      >
                        <IconComponent size={16} className="mr-1.5" />
                        <span className="text-sm">{option.name}</span>
                      </Button>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {isTagsOpen && (
        <TagSelector
          open={isTagsOpen}
          setOpen={setIsTagsOpen}
          tags={tags}
          setTags={setTags}
        >
          <TagSelectorContent
            side={"top"}
            sideoffset={0}
            anchorRef={anchorRef}
            handleTagSubmit={(selectedTags) => {
              setTags(selectedTags);
              setIsTagsOpen(false);
            }}
          />
        </TagSelector>
      )}
    </>
  );
};
