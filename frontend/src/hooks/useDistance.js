export const useDistanceFormatter = () => {

  /**
   * Formatea la distancia
   */
  const formatDistance = (
    distanciaMetros,
    distanciaFormateada = null,
    unidadMedicion = null
  ) => {
    if (distanciaFormateada && unidadMedicion) {
      return `${distanciaFormateada} ${unidadMedicion}`;
    }
    const distanciaKm = (distanciaMetros / 1000).toFixed(1);
    return `${distanciaKm} km`; // km por defecto
  };

  /**
   * Obtiene solo el valor numérico
   */
  const getDistanceValue = (distanciaMetros, distanciaFormateada = null) => {
    if (distanciaFormateada) {
      return parseFloat(distanciaFormateada);
    }
    return parseFloat((distanciaMetros / 1000).toFixed(1));
  };

  /**
   * Obtiene la unidad
   */
  const getDistanceUnit = (unidadMedicion = null) => {
    return unidadMedicion || "km";
  };

  return {
    formatDistance,
    getDistanceValue,
    getDistanceUnit,
  };
};
