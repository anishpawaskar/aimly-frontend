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
import { generateSortOrder, validateInputs } from "@/lib/utils";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router";
import { useCreateTag, useUpdateTag } from "@/hooks/mutations/tags";
import { useGetTags } from "@/hooks/queries/tags";

const TagForm = ({ data, onOpenChange }) => {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    color: data?.color || "",
  });
  const [validationError, setValidationError] = useState({
    name: "",
  });

  const { mutate: updateTagMutate, isPending: isTagUpdating } = useUpdateTag();
  const { mutate: createTagMutate, isPending: isTagCreating } = useCreateTag();
  const { data: tagsData } = useGetTags();
  const tags = tagsData?.data.tags ?? [];

  const submitBtnName = data ? "Save" : "Add";
  const loadingBtnName = submitBtnName === "Save" ? "Saving..." : "Adding...";
  const isPending = isTagUpdating || isTagCreating;

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

  const validateForm = () => {
    const valuesToValidate = {
      name: formData.name,
    };

    const defaultErrors = {
      name: "Name can't be empty.",
    };

    let errors = validateInputs(valuesToValidate, defaultErrors);

    const tagNameRegex = /^[^\\\/"#:\*\?<>\|\s]+$/;

    if (!tagNameRegex.test(formData.name) && formData.name) {
      errors.name = `Tag name can't contain \ / " # : * ? < > | Space.`;
      return errors;
    }

    if (data) {
      const isExistingTag = tags.find(
        (tag) =>
          tag._id !== data._id &&
          tag.name.toLowerCase().trim() === formData.name.toLowerCase().trim()
      );

      if (isExistingTag) {
        errors.name = "Tag name is already taken.";
      }
    }

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();

    if (Object.values(errors).some(Boolean)) {
      setValidationError((prevValidationErrors) => ({
        ...prevValidationErrors,
        ...errors,
      }));
      return;
    }

    if (data) {
      updateTagMutate(
        { tagId: data?._id, payload: formData },
        {
          onSuccess: () => {
            resetState();
            onOpenChange(false);
            navigate(`/tags/${data?._id}/tasks`);
          },
        }
      );
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

      createTagMutate(
        { payload: formData },
        {
          onSuccess: (data) => {
            resetState();
            onOpenChange(false);
            navigate(`/tags/${data?.data._id}/tasks`);
          },
        }
      );
    }
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

export default TagForm;
