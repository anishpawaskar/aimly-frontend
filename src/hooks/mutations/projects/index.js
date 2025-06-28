import {
  createProject,
  deleteProject,
  updateProject,
} from "@/services/projects";
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

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, payload }) => updateProject(projectId, payload),
    onMutate: async (variables) => {
      if (!variables.optimistic) return;

      await queryClient.cancelQueries(["projects"]);

      const previousProjectsData = queryClient.getQueryData(["projects"]);

      queryClient.setQueryData(["projects"], (oldData) => {
        const updatedProjects = oldData.data.projects.map((project) =>
          project._id === variables.projectId
            ? { ...project, ...variables.payload }
            : project
        );

        return {
          ...oldData,
          data: {
            projects: updatedProjects,
          },
        };
      });

      const updatedProjectsData = queryClient.getQueryData(["projects"]);

      return { previousProjectsData, updatedProjectsData };
    },
    onError: (_error, variables, context) => {
      if (variables?.optimistic) {
        queryClient.setQueryData(["projects"], context.previousProjectsData);
      }
    },
    onSuccess: (data, variables, context) => {
      if (variables?.optimistic) {
        const updatedProjects = context.updatedProjectsData.data.projects.map(
          (project) =>
            project._id === data.data._id
              ? { ...project, ...data.data }
              : project
        );

        const updatedData = {
          ...context.updatedProjectsData,
          data: {
            projects: updatedProjects,
          },
        };

        queryClient.setQueryData(["projects"], updatedData);
      } else {
        queryClient.setQueryData(["projects"], (oldData) => {
          const updatedProjects = oldData.data.projects.map((project) =>
            project._id === data.data._id
              ? { ...project, ...data.data }
              : project
          );

          return {
            ...oldData,
            data: {
              projects: updatedProjects,
            },
          };
        });
      }
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId }) => deleteProject(projectId),
    onMutate: async (variables) => {
      await queryClient.cancelQueries(["projects"]);

      const previousProjectsData = queryClient.getQueryData(["projects"]);

      queryClient.setQueryData(["projects"], (oldData) => {
        const filteredProjects = oldData.data.projects.filter(
          (project) => project._id !== variables.projectId
        );

        return {
          ...oldData,
          data: {
            projects: filteredProjects,
          },
        };
      });

      const updatedProjectsData = queryClient.getQueryData(["projects"]);

      return { previousProjectsData, updatedProjectsData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["projects", context.previousProjectsData]);
    },
    onSuccess: (_data, _variables, context) => {
      queryClient.setQueryData(["projects"], context.updatedProjectsData);
    },
  });
};
