import api from "./api";

export const provinciasService = {
  getAll: async () => {
    try {
      const response = await api.get("/provincias/");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/provincias/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getByPais: async (paisId) => {
    try {
      const response = await api.get(`/provincias/?pais_id=${paisId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
