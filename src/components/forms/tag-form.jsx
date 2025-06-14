import { useState } from "react";
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
import { useTasksSidenav } from "@/context/tasks-sidenav-provider";

const TagForm = ({ onOpenChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
  });
  const [validationError, setValidationError] = useState({
    serverError: "",
  });

  const { items, setItems } = useTasksSidenav();

  const resetState = () => {
    setFormData({
      name: "",
      color: "",
    });
    setValidationError((prevErrors) => ({
      ...prevErrors,
      serverError: "",
    }));
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

    if (items.length) {
      sortOrder = generateSortOrder(items[0]);
    } else {
      sortOrder = -BASE_INTERVAL;
    }

    formData._id = uuidV4();
    formData.sortOrder = sortOrder;
    setItems((prevItems) => [formData, ...prevItems]);
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
