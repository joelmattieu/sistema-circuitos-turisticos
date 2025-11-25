import axios from "axios";

const URL_BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const postRegister = async (data) => {
  try {
    const response = await axios.post(`${URL_BACKEND}/auth/register`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
