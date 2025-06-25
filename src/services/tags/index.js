import axiosInstance from "@/config/api";
import { getTagsEndpoint, updateTagEndpoint } from "@/constants/api-endpoints";
import axios from "axios";

export const getTags = async () => {
  try {
    const res = await axiosInstance.get(getTagsEndpoint);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Error while fetching tags.";
      throw new Error(message);
    }

    throw error;
  }
};

export const updateTag = async (tagId, payload) => {
  try {
    const res = await axiosInstance.patch(updateTagEndpoint(tagId), payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Error while updating tag.";
      throw new Error(message);
    }

    throw error;
  }
};
