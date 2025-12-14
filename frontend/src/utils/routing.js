const ORS_API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjRhZjYzOWQwZmQwMjQ2YTdiNDA0ZjlmODM4NDgzYTkxIiwiaCI6Im11cm11cjY0In0=";

// Función para generar instrucción en español
function generarInstruccionEspanol(tipo, nombreCalle) {
  const tiposInstruccion = {
    0: (calle) => `Continúa por ${calle}`,
    1: (calle) => `Gira a la derecha en ${calle}`,
    2: (calle) => `Gira a la izquierda en ${calle}`,
    3: (calle) => `Gira fuertemente a la derecha en ${calle}`,
    4: (calle) => `Gira fuertemente a la izquierda en ${calle}`,
    5: (calle) => `Gira ligeramente a la derecha en ${calle}`,
    6: (calle) => `Gira ligeramente a la izquierda en ${calle}`,
    7: (calle) => `Continúa por ${calle}`,
    10: (calle) => `Toma la rotonda en ${calle}`,
    11: (calle) => `Dirígete por ${calle}`,
    12: (calle) => `Llegas a ${calle}`,
  };

  const generador =
    tiposInstruccion[tipo] || ((calle) => `Continúa por ${calle}`);
  return generador(nombreCalle || "esta calle");
}

export async function obtenerRutaPasoAPaso(origen, destino) {
  const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${ORS_API_KEY}&start=${origen.lng},${origen.lat}&end=${destino.lng},${destino.lat}&language=es&instructions=true&instructions_format=text`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const route = data.features[0];
    const geometry = route.geometry.coordinates;
    const steps = route.properties.segments[0].steps;

    return {
      coordenadas: geometry.map(([lng, lat]) => ({ lat, lng })),
      pasos: steps.map((step, index) => ({
        instruccion: generarInstruccionEspanol(step.type, step.name),
        instruccionOriginal: step.instruction,
        distancia: step.distance,
        duracion: step.duration,
        tipo: step.type,
        nombreCalle: step.name,
        indice: index,
      })),
      distanciaTotal: route.properties.segments[0].distance,
      duracionTotal: route.properties.segments[0].duration,
    };
  } catch (error) {
    console.error("Error al obtener ruta:", error);
    return null;
  }
}

// Tipos de maniobra para iconos
export const TIPOS_MANIOBRA = {
  0: { texto: "Continúa recto", icono: "straight" },
  1: { texto: "gira a la derecha", icono: "turn-right" },
  2: { texto: "gira a la izquierda", icono: "turn-left" },
  3: { texto: "gira fuertemente a la derecha", icono: "turn-sharp-right" },
  4: { texto: "gira fuertemente a la izquierda", icono: "turn-sharp-left" },
  5: { texto: "gira ligeramente a la derecha", icono: "turn-slight-right" },
  6: { texto: "gira ligeramente a la izquierda", icono: "turn-slight-left" },
  7: { texto: "continúa", icono: "straight" },
  10: { texto: "toma la rotonda", icono: "roundabout" },
  11: { texto: "dirígete por", icono: "straight" },
  12: { texto: "llegas a", icono: "arrival" },
};
