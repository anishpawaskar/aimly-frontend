import axiosInstance from "@/config/api";
import {
  createTagEndpoint,
  deleteTagEndpoint,
  getTagsEndpoint,
  getTagWithDataEndpoint,
  updateTagEndpoint,
} from "@/constants/api-endpoints";
import axios from "axios";

export const createTag = async (payload) => {
  try {
    const res = await axiosInstance.post(createTagEndpoint, payload);
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

export const deleteTag = async (tagId) => {
  try {
    const res = await axiosInstance.delete(deleteTagEndpoint(tagId));
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Error while deleting tag.";
      throw new Error(message);
    }

    throw error;
  }
};

export const getTagWithData = async (tagId) => {
  try {
    const res = await axiosInstance.get(getTagWithDataEndpoint(tagId));
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
