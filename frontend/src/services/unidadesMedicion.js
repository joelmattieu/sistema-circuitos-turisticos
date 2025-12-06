import api from "./api";

export const unidadesMedicionService = {
  getAll: async () => {
    try {
      const response = await api.get("/unidades-medicion/");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/unidades-medicion/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
