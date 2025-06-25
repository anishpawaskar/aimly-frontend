import axiosInstance from "@/config/api";
import { getProjectsEndpoint } from "@/constants/api-endpoints";
import axios from "axios";

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
