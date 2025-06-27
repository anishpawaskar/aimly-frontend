import { createProject } from "@/services/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }) => createProject(payload),
    onSuccess: (data, _variables, _context) => {
      console.log("data", data);
      queryClient.setQueryData(["projects"], (oldData) => {
        return {
          ...oldData,
          data: {
            projects: [...oldData.data.projects, data.data],
          },
        };
      });
    },
  });
};
