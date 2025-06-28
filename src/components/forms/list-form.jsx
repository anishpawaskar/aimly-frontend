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
import { cn, generateSortOrder, validateInputs } from "@/lib/utils";
import { ColorPicker } from "../common/color-picker";
import { Tooltip, TooltipContent, TooltipTrigger } from "../primitive/tooltip";
import { BASE_INTERVAL } from "@/constants";
import { useNavigate } from "react-router";
import { useCreateProject, useUpdateProject } from "@/hooks/mutations/projects";
import { useGetProjects } from "@/hooks/queries/projects";

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
  const [validationErrors, setValidationErrors] = useState({
    name: "",
  });
  const [isInputFocus, setIsInputFocus] = useState(false);

  const { mutate: createProjectMutate, isPending: isProjectCreating } =
    useCreateProject();
  const { mutate: updateProjectMutate, isPending: isProjectUpdating } =
    useUpdateProject();
  const { data: projectsData } = useGetProjects();
  const projects = projectsData?.data?.projects || [];

  const submitBtnName = data ? "Save" : "Add";
  const loadingBtnName = submitBtnName === "Save" ? "Saving..." : "Adding...";
  const isPending = isProjectCreating || isProjectUpdating;

  const navigate = useNavigate();

  const nameInputRef = useRef(null);

  const resetState = () => {
    setFormData({
      name: "",
      color: "",
      viewType: "list",
    });
    setValidationErrors({
      name: "",
    });
  };

  const handleColorPicker = (color) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      color: color ?? "",
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      name: "",
    }));
  };

  const validateForm = () => {
    const valuesToValidate = {
      name: formData.name.trim(),
    };

    const defaultErrors = {
      name: "Name can't be empty.",
    };

    let errors = validateInputs(valuesToValidate, defaultErrors);

    if (data) {
      const isExistingProject = projects.find(
        (project) =>
          project._id !== data._id &&
          project.name.toLowerCase() === formData.name.toLowerCase().trim()
      );

      if (isExistingProject) {
        errors.name = "This list name is already exist.";
      }
    }

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();

    if (Object.values(errors).some(Boolean)) {
      setValidationErrors((prevValidationErrors) => ({
        ...prevValidationErrors,
        ...errors,
      }));
      return;
    }

    if (data) {
      formData.name = formData.name.trim();

      updateProjectMutate({
        projectId: data._id,
        payload: formData,
        optimistic: true,
      });

      navigate(`/projects/${data._id}/tasks`);
      resetState();
      onOpenChange(false);
    } else {
      let sortOrder;

      if (projects.length) {
        sortOrder = generateSortOrder({ items: projects });
      } else {
        sortOrder = -BASE_INTERVAL;
      }

      formData.sortOrder = sortOrder;
      formData.name = formData.name.trim();

      createProjectMutate(
        { payload: formData },
        {
          onSuccess: (data) => {
            navigate(`/projects/${data.data?._id}/tasks`);
            resetState();
            onOpenChange(false);
          },
        }
      );
    }
  };

  const handleCancel = () => {
    resetState();
    onOpenChange(false);
  };

  return (
    <AlertDialogContent>
      <AlertDialogTitle>Add List</AlertDialogTitle>
      <div className="flex flex-col gap-4">
        <div>
          <div
            className={cn(
              "list-name-input-wrapper h-9 rounded-md border border-gray/10 flex items-center group/nameInput",
              isInputFocus && "border-primary"
            )}
          >
            <button className="h-full w-9 border-r border-gray/10 flex items-center justify-center text-gray/50">
              <AlignJustify
                size={18}
                className="group-hover/nameInput:hidden"
              />
              <Smile size={18} className="hidden group-hover/nameInput:block" />
            </button>
            <Input
              className={"h-full border-none placeholder:text-gray/30"}
              type={"text"}
              placeholder={"Name"}
              ref={nameInputRef}
              maxLength={64}
              onFocus={() => setIsInputFocus(true)}
              onBlur={() => setIsInputFocus(false)}
              value={formData.name}
              onChange={(e) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  name: e.target.value,
                }));
                setValidationErrors((prevErrors) => ({
                  ...prevErrors,
                  name: "",
                }));
              }}
            />
          </div>
          {validationErrors.name && (
            <p className="text-xs text-wran-red">{validationErrors.name}</p>
          )}
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
                        setValidationErrors((prevErrors) => ({
                          ...prevErrors,
                          name: "",
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
            disabled={formData.name === "" || isPending}
            onClick={handleSubmit}
          >
            {isPending ? loadingBtnName : submitBtnName}
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ListForm;
