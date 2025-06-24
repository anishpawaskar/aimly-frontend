import { useRef, useState } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../primitive/alert-dialog";
import { Button } from "../primitive/button";
import {
  AlignJustify,
  ChartNoAxesGantt,
  Kanban,
  ListTree,
  Smile,
} from "lucide-react";
import { Input } from "../primitive/input";
import { cn, generateSortOrder } from "@/lib/utils";
import { ColorPicker } from "../common/color-picker";
import { Tooltip, TooltipContent, TooltipTrigger } from "../primitive/tooltip";
import { BASE_INTERVAL } from "@/constants";
import { v4 as uuidV4 } from "uuid";
// import { useTasksSidenav } from "@/context/tasks-sidenav-provider";
import { useTaskPage } from "@/context/task-page-provider";

const PROJECT_VIEW_TYPE = [
  {
    label: "List View",
    value: "list",
    icon: ListTree,
  },
  {
    label: "Kanban View",
    value: "kanban",
    icon: Kanban,
  },
  {
    label: "Timeline View",
    value: "timeline",
    icon: ChartNoAxesGantt,
  },
];

const ListForm = ({ data, onOpenChange }) => {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    color: data?.color || "",
    viewType: data?.viewType || "list",
  });
  const [validationError, setValidationError] = useState({
    serverError: "",
  });
  const [isInputFocus, setIsInputFocus] = useState(false);

  // const { items, setItems } = useTasksSidenav();
  const { projects, setProjects } = useTaskPage();

  const nameInputRef = useRef(null);

  const resetState = () => {
    setFormData({
      name: "",
      color: "",
      viewType: "list",
    });
    setValidationError({
      serverError: "",
    });
  };

  const handleColorPicker = (color) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      color: color ?? "",
    }));
    setValidationError((prevErrors) => ({
      ...prevErrors,
      serverError: "",
    }));
  };

  const handleSubmit = () => {
    let sortOrder;

    if (projects.length) {
      sortOrder = generateSortOrder({ items: projects });
    } else {
      sortOrder = -BASE_INTERVAL;
    }

    formData._id = uuidV4();
    formData.sortOrder = sortOrder;
    setProjects((prevItems) => [...prevItems, formData]);
    resetState();
    onOpenChange(false);
  };

  const handleCancel = () => {
    resetState();
    onOpenChange(false);
  };

  return (
    <AlertDialogContent>
      <AlertDialogTitle>Add List</AlertDialogTitle>
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            "list-name-input-wrapper h-9 rounded-md border border-gray/10 flex items-center group/nameInput",
            isInputFocus && "border-primary"
          )}
        >
          <button className="h-full w-9 border-r border-gray/10 flex items-center justify-center text-gray/50">
            <AlignJustify size={18} className="group-hover/nameInput:hidden" />
            <Smile size={18} className="hidden group-hover/nameInput:block" />
          </button>
          <Input
            className={"h-full border-none placeholder:text-gray/30"}
            type={"text"}
            placeholder={"Name"}
            ref={nameInputRef}
            onFocus={() => setIsInputFocus(true)}
            onBlur={() => setIsInputFocus(false)}
            value={formData.name}
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                name: e.target.value,
              }));
              setValidationError((prevErrors) => ({
                ...prevErrors,
                serverError: "",
              }));
            }}
          />
        </div>
        <ColorPicker
          placeholder={"List Color"}
          selectedColor={formData.color}
          handleColorPicker={handleColorPicker}
        />
        <div className="flex items-center">
          <p className="text-sm w-[40%] text-gray/50">View Type</p>
          <div className="w-[60%] flex items-center gap-4">
            {PROJECT_VIEW_TYPE.map((view) => {
              const IconComponent = view.icon;
              const isSelectedViewType = view.value === formData.viewType;

              return (
                <Tooltip key={view.label}>
                  <TooltipTrigger>
                    <button
                      className={cn(
                        "w-11 h-9 flex items-center justify-center rounded-md border border-transparent bg-gray/5 transition-all",
                        isSelectedViewType &&
                          "border-[var(--primary-color)] bg-primary/10"
                      )}
                      onClick={() => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          viewType: view.value,
                        }));
                        setValidationError((prevErrors) => ({
                          ...prevErrors,
                          serverError: "",
                        }));
                      }}
                    >
                      <IconComponent
                        size={18}
                        className={cn(
                          "text-gray/50",
                          isSelectedViewType && "text-[var(--primary-color)]"
                        )}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={8}>{view.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
        {validationError.serverError && <p>{validationError.serverError}</p>}
      </div>
      <AlertDialogFooter className={"mt-8"}>
        <AlertDialogCancel asChild>
          <Button variant={"outlineGhost"} onClick={handleCancel}>
            Cancel
          </Button>
        </AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            variant={"primary"}
            disabled={formData.name === ""}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ListForm;
