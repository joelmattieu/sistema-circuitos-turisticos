import { useSelector } from "react-redux";

/**
 * Hook para formatear distancias según la preferencia del usuario (km o millas).
 * Lee unidad_medicion_id del Redux (1 = km, 2 = millas).
 */
export const useDistanceFormatter = () => {
  const { preferencias } = useSelector((state) => state.preferencias);

  // unidad_medicion_id: 1 = Kilómetros, 2 = Millas
  const usaMillas = preferencias?.unidad_medicion_id === 2;

  /** Convierte metros a la unidad preferida. Si el backend ya lo formateó, lo usa directo. */
  const formatDistance = (
    distanciaMetros,
    modoCorto = false,
    distanciaFormateada = null,
    unidadMedicion = null,
  ) => {
    // Si el backend ya envió la distancia formateada, usarla directamente
    if (distanciaFormateada && unidadMedicion) {
      return `${distanciaFormateada} ${unidadMedicion}`;
    }

    if (usaMillas) {
      const pies = distanciaMetros * 3.28084;
      if (modoCorto && pies < 1000) {
        return `${Math.round(pies)} ft`;
      }
      const millas = (distanciaMetros / 1000) * 0.621371;
      return `${millas.toFixed(1)} mi`;
    }

    // Kilómetros (por defecto)
    if (modoCorto && distanciaMetros < 1000) {
      return `${Math.round(distanciaMetros)} m`;
    }
    const km = (distanciaMetros / 1000).toFixed(1);
    return `${km} km`;
  };

  const getDistanceValue = (distanciaMetros, distanciaFormateada = null) => {
    if (distanciaFormateada) {
      return parseFloat(distanciaFormateada);
    }
    if (usaMillas) {
      return parseFloat(((distanciaMetros / 1000) * 0.621371).toFixed(1));
    }
    return parseFloat((distanciaMetros / 1000).toFixed(1));
  };

  const getDistanceUnit = (unidadMedicion = null) => {
    if (unidadMedicion) return unidadMedicion;
    return usaMillas ? "mi" : "km";
  };

  return {
    formatDistance,
    getDistanceValue,
    getDistanceUnit,
    usaMillas,
  };
};
