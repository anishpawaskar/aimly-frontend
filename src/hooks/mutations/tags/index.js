import { updateTag } from "@/services/tags";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tagId, payload }) => updateTag(tagId, payload),
    onMutate: async (variables) => {
      if (!variables.optimistic) return;

      await queryClient.cancelQueries({ queryKey: ["tags"] });

      const previousTags = queryClient.getQueryData(["tags"]);

      queryClient.setQueryData(["tags"], (oldData) => {
        const updatedTags = oldData.data.tags.map((tag) =>
          tag._id === variables.tagId ? { ...tag, ...variables.payload } : tag
        );
        return { ...oldData, data: { tags: updatedTags } };
      });

      return { previousTags };
    },
    onError: (_error, variables, context) => {
      if (variables.optimistic) {
        queryClient.setQueryData(["tags"], context.previousTags);
      }
    },
    onSuccess: (data, variables) => {
      if (!variables.optimistic) {
        queryClient.setQueryData(["tags"], (oldData) => {
          const updatedTags = oldData.data.tags.map((tag) =>
            tag._id === data.data._id ? { ...tag, ...data.data } : tag
          );

          return { ...oldData, data: { tags: updatedTags } };
        });
      }
    },
  });
};
