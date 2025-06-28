import { getTags } from "@/services/tags";
import { useQuery } from "@tanstack/react-query";

export const useGetTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
};
