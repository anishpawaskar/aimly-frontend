import { getUserSettings } from "@/services/settings";
import { useQuery } from "@tanstack/react-query";

export const useGetUserSettings = () => {
  return useQuery({
    queryKey: ["user-settings"],
    queryFn: getUserSettings,
  });
};
