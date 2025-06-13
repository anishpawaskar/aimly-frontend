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

const TagForm = ({ onOpenChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
  });
  const [validationError, setValidationError] = useState({
    serverError: "",
  });

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
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setFormData({
      name: "",
      color: "",
    });
    setValidationError((prevErrors) => ({
      ...prevErrors,
      serverError: "",
    }));
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
