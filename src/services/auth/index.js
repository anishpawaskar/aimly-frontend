import axiosInstance from "@/config/api";
import {
  getUserSettingsEndpoint,
  userSigninEndpoint,
  userSignupEndpoint,
} from "@/constants/api-endpoints";
import axios from "axios";

export const signupUser = async (data) => {
  try {
    const res = await axiosInstance.post(userSignupEndpoint, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Signup failed.";
      throw new Error(message);
    }
    throw error;
  }
};

export const signinUser = async (data) => {
  try {
    const res = await axiosInstance.post(userSigninEndpoint, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Signin failed.";
      throw new Error(message);
    }
    throw error;
  }
};

export const getUserSelfDetails = async () => {
  try {
    const res = await axiosInstance.get(getUserSettingsEndpoint);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "User details fetching failed.";
      throw new Error(message);
    }
    throw error;
  }
};
