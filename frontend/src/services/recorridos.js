import api from "./api";

/**
 * Registra que un usuario visitó un punto de interés
 */
export const registrarVisita = async (usuarioId, circuitoId, poiId) => {
  try {
    const response = await api.post("/recorridos/visita", {
      usuario_id: usuarioId,
      circuito_id: circuitoId,
      poi_id: poiId,
    });
    return response.data;
  } catch (error) {
    console.error("Error registrando visita:", error);
    throw error;
  }
};

/**
 * Obtiene el recorrido de un usuario en un circuito
 */
export const obtenerRecorrido = async (usuarioId, circuitoId) => {
  try {
    const response = await api.get(
      `/recorridos/usuario/${usuarioId}/circuito/${circuitoId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo recorrido:", error);
    throw error;
  }
};

/**
 * Obtiene la lista de POIs visitados por el usuario en un circuito
 */
export const obtenerPoisVisitados = async (usuarioId, circuitoId) => {
  try {
    const response = await api.get(
      `/recorridos/usuario/${usuarioId}/circuito/${circuitoId}/visitados`,
    );
    return response.data.pois_visitados || [];
  } catch (error) {
    console.error("Error obteniendo POIs visitados:", error);
    throw error;
  }
};
