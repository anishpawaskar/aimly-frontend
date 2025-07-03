import { createTask } from "@/services/tasks";
import { useMutation } from "@tanstack/react-query";

export const useCreateTask = () => {
  return useMutation({
    mutationFn: ({ payload }) => createTask(payload),
  });
};
