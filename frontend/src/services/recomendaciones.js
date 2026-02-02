import api from "./api";

export const obtenerCircuitosRecomendados = async (
  ubicacion = null,
  modoTransporte = null,
  usuarioId = null,
) => {
  try {
    const params = {};

    if (ubicacion && ubicacion.latitude && ubicacion.longitude) {
      params.lat = ubicacion.latitude;
      params.lon = ubicacion.longitude;
    }

    if (modoTransporte) {
      params.modo_transporte = modoTransporte;
    }

    if (usuarioId) {
      params.usuario_id = usuarioId;
    }

    const response = await api.get("/recomendaciones/circuitos", { params });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo circuitos recomendados:", error);
    throw error;
  }
};
