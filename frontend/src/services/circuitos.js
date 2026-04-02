import api from "./api";

export const circuitosService = {
  getAll: async ({ lat, lon, ordenarPorDistancia } = {}) => {
    const params = {};
    if (lat != null) params.lat = lat;
    if (lon != null) params.lon = lon;
    if (ordenarPorDistancia) params.ordenar_por_distancia = true;
    const response = await api.get("/circuitos", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/circuitos/${id}`);
    return response.data;
  },

  finalizar: async (id) => {
    const response = await api.post(`/circuitos/${id}/finalizar`);
    return response.data;
  },
};

export default circuitosService;
