import { useGetUserSelfDetails } from "@/hooks/queries/user";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { data, isLoading, isSuccess } = useGetUserSelfDetails();

  const contextValue = {
    isAuthenticated: isSuccess,
    userDetails: data?.data || null,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
