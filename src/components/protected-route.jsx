import { useAuthContext } from "@/context/auth-provider";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, userDetails, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <h1 className="text-3xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated || !userDetails) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};
