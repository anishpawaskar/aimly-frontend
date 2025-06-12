import { useRef, useState } from "react";
import { Input } from "../primitive/input";
import { IconButton } from "../primitive/icon-button";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../primitive/button";
import { Link } from "react-router";

export const AuthForm = ({
  heading,
  onChange,
  onSubmit,
  authType,
  formData,
  validationErrors,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const isSignInForm = authType === "signIn";
  const authRedirectText = isSignInForm
    ? "Don't have an account?"
    : "Already have an account?";
  const passwordPlaceholder = isSignInForm
    ? "Password"
    : "Password: 8-30 characters";
  const authRedirectRoute = isSignInForm ? "/signup" : "/signin";

  const forgotPasswordValues = {
    pathname: "/requestRestPassword",
  };

  if (formData.email) {
    forgotPasswordValues.search = `?email=${formData.email}`;
  }

  return (
    <div
      // TODO: fix shadow later
      className={`auth-form w-96 p-11 rounded-xl flex flex-col gap-5 sm:bg-white sm:shadow-default-app ${
        isSignInForm ? "min-h-[24rem]" : "min-h-[21rem]"
      } absolute top-[10%] left-1/2 -translate-x-1/2`}
    >
      <h3 className="head3 text-[26px] leading-8 text-frontColor font-semibold">
        {heading}
      </h3>
      <form className="auth-form flex flex-col gap-4" onSubmit={onSubmit}>
        <div>
          <Input
            autoFocus
            type={"text"}
            placeholder={"Email"}
            name={"email"}
            onChange={onChange}
            value={formData.email}
          />
          {validationErrors?.email && (
            <p className="text-xs ml-2 mt-2 text-wran-red">
              {validationErrors?.email}
            </p>
          )}
        </div>
        <div>
          <div
            className={`flex items-center border ${
              isPasswordFocus
                ? "border-[var(--primary-color)]"
                : "border-gray/10"
            } rounded-md`}
          >
            <Input
              type={isPasswordVisible ? "text" : "password"}
              placeholder={passwordPlaceholder}
              name={"password"}
              onChange={onChange}
              value={formData.password}
              className={"border-none"}
              onFocus={() => setIsPasswordFocus(true)}
              onBlur={() => setIsPasswordFocus(false)}
            />
            <IconButton
              type={"button"}
              variant={"ghost"}
              className={"hover:bg-none"}
              onClick={() => setIsPasswordVisible((prevState) => !prevState)}
            >
              {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </IconButton>
          </div>
          {(validationErrors?.password || validationErrors?.serverError) && (
            <p className="text-xs ml-2 mt-2 text-wran-red">
              {validationErrors?.password || validationErrors?.serverError}
            </p>
          )}
        </div>
        <Button size={"full"}>{heading}</Button>
      </form>
      {isSignInForm && (
        <div className="flex justify-center items-center">
          <Link
            to={forgotPasswordValues}
            className="text-xs text-center text-frontColor opacity-60 hover:underline decoration-1"
          >
            Forgot Password
          </Link>
        </div>
      )}

      <div className="flex justify-center items-center gap-1 flex-wrap text-sm">
        <span className="text-frontColor opacity-60">{authRedirectText}</span>
        <Link
          href={authRedirectRoute}
          className="text-[var(--primary-color)] hover:underline decoration-1"
        >
          {heading}
        </Link>
      </div>
    </div>
  );
};
