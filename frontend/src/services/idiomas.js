import api from "./api";

export const idiomasService = {
  getAll: async () => {
    try {
      const response = await api.get("/idiomas/");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/idiomas/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
