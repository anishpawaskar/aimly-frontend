import axiosInstance from "@/config/api";
import { userSignupEndpoint } from "@/constants/api-endpoints";
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
