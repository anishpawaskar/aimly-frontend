import { useEffect, useState } from "react";
import { ColorPicker } from "../common/color-picker";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../primitive/alert-dialog";
import { Input } from "../primitive/input";
import { Button } from "../primitive/button";
import { BASE_INTERVAL } from "@/constants";
import { generateSortOrder } from "@/lib/utils";
import { v4 as uuidV4 } from "uuid";
// import { useTasksSidenav } from "@/context/tasks-sidenav-provider";
import { useTaskPage } from "@/context/task-page-provider";
import { useNavigate } from "react-router";

const TagForm = ({ data, onOpenChange }) => {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    color: data?.color || "",
  });
  const [validationError, setValidationError] = useState({
    name: "",
  });

  // const { items, setItems } = useTasksSidenav();
  const { tags, setTags } = useTaskPage();
  const navigate = useNavigate();

  const resetState = () => {
    setFormData({
      name: "",
      color: "",
    });
    setValidationError((prevErrors) => ({
      ...prevErrors,
      name: "",
    }));
  };

  const handleColorPicker = (color) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      color: color ?? "",
    }));
    setValidationError((prevErrors) => ({
      ...prevErrors,
      name: "",
    }));
  };

  const handleSubmit = () => {
    const isExistingTag = tags.find(
      (tag) =>
        tag._id !== data._id &&
        tag.name.toLowerCase().trim() === formData.name.toLowerCase().trim()
    );

    if (isExistingTag) {
      setValidationError((prevErrors) => ({
        ...prevErrors,
        name: `Tag name ${formData.name} is already taken.`,
      }));
      return;
    }

    if (data) {
      const updatedTags = tags.map((tag) =>
        tag._id === data._id
          ? { ...tag, ...formData, name: formData.name.trim() }
          : tag
      );
      setTags(updatedTags);
    } else {
      let sortOrder;

      if (tags.length) {
        sortOrder = generateSortOrder({ items: tags });
      } else {
        sortOrder = -BASE_INTERVAL;
      }

      formData._id = uuidV4();
      formData.sortOrder = sortOrder;
      formData.name = formData.name.trim();
      setTags((prevItems) => [...prevItems, formData]);
    }

    navigate(`/tags/${formData._id}/tasks`);
    resetState();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    resetState();
  };

  return (
    <AlertDialogContent>
      <AlertDialogTitle>Add Tags</AlertDialogTitle>
      <div className="name-wrapper">
        <Input
          className={"h-9"}
          type={"text"}
          placeholder={"Name"}
          value={formData.name}
          maxLength={64}
          onChange={(e) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              name: e.target.value,
            }));
            setValidationError((prevErrors) => ({
              ...prevErrors,
              name: "",
            }));
          }}
        />
        {validationError.name && (
          <p className="text-xs text-wran-red">{validationError.name}</p>
        )}
      </div>
      <ColorPicker
        placeholder={"Color"}
        selectedColor={formData.color}
        handleColorPicker={handleColorPicker}
      />
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

export default TagForm;
