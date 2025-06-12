import { Button } from "@/components/primitive/button";
import { Link, Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const location = useLocation();

  const isResetPasswordRoute = location.pathname === "/requestRestPassword";
  const isSignupRoute = location.pathname === "/signup";
  const buttonHeading = isSignupRoute ? "Sign In" : "Sign Up";
  const authRedirectText = isSignupRoute
    ? "Already have an account?"
    : "Don't have an account?";
  const authRedirectRoute = isSignupRoute ? "/signin" : "/signup";

  return (
    <div className="auth-layout h-screen w-full bg-auth-bg">
      <div className="auth-header flex items-center justify-between h-[15%] px-10">
        <div>Brand logo</div>
        {!isResetPasswordRoute && (
          <div className="auth-header-right-side flex items-center gap-4">
            <p className="text-[13px] text-gray/60 hidden sm:block">
              {authRedirectText}
            </p>
            <Button size={"sm"} className={"text-[13px] px-4"} asChild>
              <Link to={authRedirectRoute}>{buttonHeading}</Link>
            </Button>
          </div>
        )}
      </div>
      <div className="h-[85%] relative">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
