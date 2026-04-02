import api from "./api";

export const idiomasService = {
  getAll: async () => {
    const response = await api.get("/idiomas/");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/idiomas/${id}`);
    return response.data;
  },
};
