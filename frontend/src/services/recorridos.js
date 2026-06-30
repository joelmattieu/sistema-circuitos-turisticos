import api from "./api";

export const iniciarRecorrido = async (circuitoId) => {
  const response = await api.post("/recorridos/iniciar", {
    circuito_id: circuitoId,
  });
  return response.data;
};

export const registrarVisita = async (circuitoId, poiId) => {
  const response = await api.post("/recorridos/visita", {
    circuito_id: circuitoId,
    poi_id: poiId,
  });
  return response.data;
};

export const obtenerRecorrido = async (circuitoId) => {
  const response = await api.get(`/recorridos/circuito/${circuitoId}`);
  return response.data;
};

export const obtenerPoisVisitados = async (circuitoId) => {
  const response = await api.get(`/recorridos/circuito/${circuitoId}/visitados`);
  return response.data.pois_visitados || [];
};
