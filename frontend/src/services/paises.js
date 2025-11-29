import api from "./api";

export const paisesService = {
  getAll: async () => {
    try {
      const response = await api.get("/paises/");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/paises/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
