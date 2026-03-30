import api from "./api";

export const circuitosService = {
  getAll: async (options = {}) => {
    try {
      const { usuarioId, lat, lon, ordenarPorDistancia } = options;
      const query = new URLSearchParams();

      if (usuarioId) query.append("usuario_id", String(usuarioId));
      if (lat != null) query.append("lat", String(lat));
      if (lon != null) query.append("lon", String(lon));
      if (ordenarPorDistancia) query.append("ordenar_por_distancia", "true");

      const queryString = query.toString();
      const response = await api.get(`/circuitos${queryString ? `?${queryString}` : ""}`);
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
