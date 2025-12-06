import api from "./api";

export const preferenciasService = {
  getByUsuarioId: async (usuarioId) => {
    try {
      const response = await api.get(`/preferencias/${usuarioId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createOrUpdate: async (preferenciaData) => {
    try {
      const response = await api.post("/preferencias", preferenciaData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  update: async (preferenciaId, preferenciaData) => {
    try {
      const response = await api.put(
        `/preferencias/${preferenciaId}`,
        preferenciaData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  delete: async (preferenciaId) => {
    try {
      const response = await api.delete(`/preferencias/${preferenciaId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
