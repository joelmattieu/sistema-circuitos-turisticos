import { useSelector } from "react-redux";

const ID_UNIDAD_MILLAS = 2;
const METROS_A_PIES = 3.28084;
const METROS_A_MILLAS = 0.621371;

export const useDistanceFormatter = () => {
  const { preferencias } = useSelector((state) => state.preferencias);
  const usaMillas = preferencias?.unidad_medicion_id === ID_UNIDAD_MILLAS;

  const formatDistance = (
    distanciaMetros,
    modoCorto = false,
    distanciaFormateada = null,
    unidadMedicion = null,
  ) => {
    if (distanciaFormateada && unidadMedicion) {
      return `${distanciaFormateada} ${unidadMedicion}`;
    }

    if (usaMillas) {
      const pies = distanciaMetros * METROS_A_PIES;
      if (modoCorto && pies < 1000) {
        return `${Math.round(pies)} ft`;
      }
      const millas = (distanciaMetros / 1000) * METROS_A_MILLAS;
      return `${millas.toFixed(1)} mi`;
    }

    if (modoCorto && distanciaMetros < 1000) {
      return `${Math.round(distanciaMetros)} m`;
    }
    return `${(distanciaMetros / 1000).toFixed(1)} km`;
  };

  return { formatDistance, usaMillas };
};
