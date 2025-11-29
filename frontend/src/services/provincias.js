import api from "./api";

export const provinciasService = {
  getAll: async () => {
    const response = await api.get("/provincias");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/provincias/${id}`);
    return response.data;
  },

  getByPais: async (paisId) => {
    const response = await api.get(`/provincias/?pais_id=${paisId}`);
    return response.data;
  },
};
