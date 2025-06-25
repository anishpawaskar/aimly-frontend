import { isValidEmail, validateInputs } from "@/lib/utils";
import { useState } from "react";
import { AuthForm } from "./auth-form";
import { useMutation } from "@tanstack/react-query";
import { signinUser } from "@/services/auth";

export const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
    serverError: "",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signinUser,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    setValidationErrors((prevValidationErrors) => ({
      ...prevValidationErrors,
      [name]: value
        ? ""
        : `${name === "email" ? "Email address" : "Password"} can't be empty.`,
      serverError: "",
    }));
  };

  const validateForm = () => {
    const valuesToValidate = {
      email: formData.email,
      password: formData.password,
    };

    const defaultErrors = {
      email: "Email address can't be empty.",
      password: "Password can't be empty.",
    };

    let errors = validateInputs(valuesToValidate, defaultErrors);

    if (!isValidEmail(formData.email) && formData.email) {
      errors.email = "Invalid email format.";
    }

    if (formData.password.length < 6) {
      errors.password = "Password requires at least 6 characters.";
    }

    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.values(errors).some(Boolean)) {
      setValidationErrors((prevValidationErrors) => ({
        ...prevValidationErrors,
        ...errors,
      }));
      return;
    }

    try {
      const user = await mutateAsync(formData);
      console.log("user", user);
    } catch (error) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        serverError: error.message,
      }));
    }
  };

  return (
    <AuthForm
      heading={"Sign In"}
      authType={"signIn"}
      onChange={onChange}
      onSubmit={onSubmit}
      formData={formData}
      validationErrors={validationErrors}
      isLoading={isPending}
    />
  );
};
