import api from "./api";

export const obtenerCircuitosRecomendados = async (ubicacion = null, modoTransporte = null) => {
  const params = {};
  if (ubicacion?.latitude && ubicacion?.longitude) {
    params.lat = ubicacion.latitude;
    params.lon = ubicacion.longitude;
  }
  if (modoTransporte) {
    params.modo_transporte = modoTransporte;
  }
  const response = await api.get("/recomendaciones/circuitos", { params });
  return response.data;
};
