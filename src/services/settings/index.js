import axiosInstance from "@/config/api";
import { getUserSettingsEndpoint } from "@/constants/api-endpoints";

export const getUserSettings = async () => {
  try {
    const res = await axiosInstance.get(getUserSettingsEndpoint);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Error while fetching settings.";
      throw new Error(message);
    }

    throw error;
  }
};
