import api from "./api";

export const modosTransporteService = {
  getAll: async () => {
    try {
      const response = await api.get("/modos-transporte/");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/modos-transporte/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
