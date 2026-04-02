import api from "./api";

export const preferenciasService = {
  getMe: async () => {
    const response = await api.get("/preferencias/me");
    return response.data;
  },

  createOrUpdate: async (data) => {
    const response = await api.post("/preferencias", data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/preferencias/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/preferencias/${id}`);
    return response.data;
  },
};
