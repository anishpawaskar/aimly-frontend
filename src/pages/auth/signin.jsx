import { AuthForm } from "@/components/forms/auth-form";
import { Button } from "@/components/primitive/button";
import { isValidEmail, validateInputs } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router";

const Signin = () => {
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

    if (formData.password.length < 6) {
      errors.password = "Password requires at least 6 characters.";
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

    console.log("logged in user");
  };

  return (
    // <div className="h-screen w-full">
    //   <div className="signin-page-header flex items-center justify-end h-[15%] px-5">
    //     <div className="signin-page-right-header flex items-center gap-4">
    //       <p className="text-sm text-gray/60">Don't have account?</p>
    //       <Button asChild>
    //         <Link to={"/signup"}>Sign Up</Link>
    //       </Button>
    //     </div>
    //   </div>
    //   <div className="h-[85%] relative">
    <AuthForm
      heading={"Sign In"}
      authType={"signIn"}
      onChange={onChange}
      onSubmit={onSubmit}
      formData={formData}
      validationErrors={validationErrors}
    />
    //   </div>
    // </div>
  );
};

export default Signin;
