import { createTag, getTags, updateTag } from "@/services/tags";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }) => createTag(payload),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["tags"] });

      const previousTags = queryClient.getQueryData(["tags"]);

      queryClient.setQueryData(["tags"], (oldData) => {
        return {
          ...oldData,
          data: {
            tags: [...oldData.data.tags, variables.payload],
          },
        };
      });

      const newTags = queryClient.getQueryData(["tags"]);

      return { previousTags, newTags };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["tags"], context.previousTags);
    },
    onSuccess: (data, { payload }, context) => {
      const newTagsData = context.newTags;

      const updatedTags = newTagsData.data.tags.map((tag) =>
        tag._id === payload._id ? { ...tag, _id: data?.data._id } : tag
      );

      const updatedTagsData = {
        ...newTagsData,
        data: {
          tags: updatedTags,
        },
      };

      queryClient.setQueryData(["tags"], updatedTagsData);
    },
  });
};

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

export const useGetTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
};
