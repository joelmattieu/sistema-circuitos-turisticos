import api from "./api";

export const modosTransporteService = {
  getAll: async () => {
    const response = await api.get("/modos-transporte/");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/modos-transporte/${id}`);
    return response.data;
  },
};
