import api from "./api";

export const circuitosService = {
  getAll: async (usuarioId = null) => {
    try {
      const params = usuarioId ? `?usuario_id=${usuarioId}` : "";
      const response = await api.get(`/circuitos${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getById: async (id, usuarioId = null) => {
    try {
      const params = usuarioId ? `?usuario_id=${usuarioId}` : "";
      const response = await api.get(`/circuitos/${id}${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getByCategoria: async (categoriaId, usuarioId = null) => {
    try {
      const params = new URLSearchParams();
      params.append("categoria_id", categoriaId);
      if (usuarioId) params.append("usuario_id", usuarioId);
      const response = await api.get(`/circuitos/?${params.toString()}`);
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
