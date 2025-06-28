import axiosInstance from "@/config/api";
import {
  createProjectEndpoint,
  deleteProjectEndpoint,
  getProjectsEndpoint,
  updateProjectEndpoint,
} from "@/constants/api-endpoints";
import axios from "axios";

export const createProject = async (payload) => {
  try {
    const res = await axiosInstance.post(createProjectEndpoint, payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Error while fetching projects.";
      throw new Error(message);
    }

    throw error;
  }
};

export const getProjects = async () => {
  try {
    const res = await axiosInstance.get(getProjectsEndpoint);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Error while fetching projects.";
      throw new Error(message);
    }

    throw error;
  }
};

export const updateProject = async (projectId, payload) => {
  try {
    const res = await axiosInstance.patch(
      updateProjectEndpoint(projectId),
      payload
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Error while updating project.";
      throw new Error(message);
    }

    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const res = await axiosInstance.delete(deleteProjectEndpoint(projectId));
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Error while deleting project.";
      throw new Error(message);
    }

    throw error;
  }
};

export const getProjectWithData = async (projectId) => {
  try {
    const res = await axiosInstance.get(getProjectWithData(projectId));
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Error while deleting project.";
      throw new Error(message);
    }

    throw error;
  }
};
