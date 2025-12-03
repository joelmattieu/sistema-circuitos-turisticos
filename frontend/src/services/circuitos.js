import api from "./api";

export const circuitosService = {
  getAll: async () => {
    try {
      const response = await api.get("/circuitos");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/circuitos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getByCategoria: async (categoriaId) => {
    try {
      const response = await api.get(`/circuitos/?categoria_id=${categoriaId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  finalizar: async (id) => {
    try {
      const response = await api.post(`/circuitos/${id}/finalizar`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default circuitosService;
