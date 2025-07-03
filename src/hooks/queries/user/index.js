import { getUserSelfDetails } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetUserSelfDetails = () => {
  return useQuery({
    queryKey: ["userSelfDetails"],
    queryFn: getUserSelfDetails,
  });
};
