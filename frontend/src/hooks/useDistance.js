import { useSelector } from "react-redux";

export const useDistanceFormatter = () => {
  const { preferencias } = useSelector((state) => state.preferencias);

  /**
   * Convierte metros a la unidad preferida del usuario y devuelve solo el valor numérico
   * @param {number} distanciaMetros - Distancia en metros
   * @param {number|null} distanciaFormateada - Distancia ya formateada del backend
   * @returns {number} - Valor numérico de la distancia
   */
  const getDistanceValue = (distanciaMetros, distanciaFormateada = null) => {
    if (distanciaFormateada) {
      return parseFloat(distanciaFormateada);
    }

    if (preferencias?.unidad_medicion_id === 2) {
      return parseFloat(((distanciaMetros / 1000) * 0.621371).toFixed(1));
    }
    return parseFloat((distanciaMetros / 1000).toFixed(1));
  };

  /**
   * Devuelve la unidad de medición del usuario
   * @returns {string} - 'km' o 'mi'
   */
  const getDistanceUnit = (unidadMedicion = null) => {
    if (unidadMedicion) {
      return unidadMedicion;
    }

    return preferencias?.unidad_medicion_id === 2 ? "mi" : "km";
  };

  /**
   * Convierte metros a la unidad preferida y devuelve string formateado con unidad
   * @param {number} distanciaMetros - Distancia en metros
   * @param {string|null} distanciaFormateada
   * @param {string|null} unidadMedicion - Unidad de medición del backend
   * @returns {string} - Distancia formateada con unidad (ej: "5.2 km" o "3.2 mi")
   */
  const formatDistance = (
    distanciaMetros,
    distanciaFormateada = null,
    unidadMedicion = null
  ) => {
    if (distanciaFormateada && unidadMedicion) {
      return `${distanciaFormateada} ${unidadMedicion}`;
    }

    const valor = getDistanceValue(distanciaMetros, distanciaFormateada);
    const unidad = getDistanceUnit(unidadMedicion);

    return `${valor} ${unidad}`;
  };

  return {
    formatDistance, // Devuelve "5.2 km" o "3.2 mi"
    getDistanceValue, // Devuelve 5.2 (número)
    getDistanceUnit, // Devuelve "km" o "mi"
  };
};
