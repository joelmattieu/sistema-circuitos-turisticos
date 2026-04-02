import api from "./api";

export const unidadesMedicionService = {
  getAll: async () => {
    const response = await api.get("/unidades-medicion/");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/unidades-medicion/${id}`);
    return response.data;
  },
};
