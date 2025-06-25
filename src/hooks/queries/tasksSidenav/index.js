import { useQuery } from "@tanstack/react-query";

export const useTasksSidenavData = (item) => {
  return useQuery({
    queryKey: [item.queryKey],
    queryFn: item.queryFn,
  });
};
