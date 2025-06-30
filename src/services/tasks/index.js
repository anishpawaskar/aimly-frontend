import axiosInstance from "@/config/api";
import { createTaskEndpoint } from "@/constants/api-endpoints";
import axios from "axios";

export const createTask = async (payload) => {
  try {
    const res = await axiosInstance.post(createTaskEndpoint);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Error while fetching tag.";
      throw new Error(message);
    }

    throw error;
  }
};
