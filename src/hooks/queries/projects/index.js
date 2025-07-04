import { getProjects } from "@/services/projects";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
