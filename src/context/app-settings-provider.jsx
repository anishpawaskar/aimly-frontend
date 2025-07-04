import { useGetUserSettings } from "@/hooks/queries/settings";
import { createContext, useContext } from "react";

const AppSettingsContext = createContext(null);
export const useAppSettings = () => useContext(AppSettingsContext);

export const AppSettingsProvider = ({ children }) => {
  const { data, isLoading, isSuccess } = useGetUserSettings();

  const contextValue = {
    isSettingFetched: isSuccess,
    userSettings: data?.data || null,
    isSettingsFetching: isLoading,
  };

  return (
    <AppSettingsContext.Provider value={contextValue}>
      {children}
    </AppSettingsContext.Provider>
  );
};
