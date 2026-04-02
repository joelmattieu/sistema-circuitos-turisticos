import api from "./api";

export const paisesService = {
  getAll: async () => {
    const response = await api.get("/paises/");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/paises/${id}`);
    return response.data;
  },
};
