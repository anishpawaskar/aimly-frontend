import { isValidEmail, validateInputs } from "@/lib/utils";
import { AuthForm } from "./auth-form";
import { useState } from "react";

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
    serverError: "",
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

    if (formData.password.length < 6 || formData.password.length > 30) {
      errors.password = "Password requires 6~30 characters long.";
    }

    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.values(errors).some(Boolean)) {
      setValidationErrors((prevValidationErrors) => ({
        ...prevValidationErrors,
        ...errors,
      }));
      return;
    }

    console.log("save kar");
  };

  return (
    <AuthForm
      heading={"Sign Up"}
      authType={"signUp"}
      onChange={onChange}
      onSubmit={onSubmit}
      formData={formData}
      validationErrors={validationErrors}
    />
  );
};
