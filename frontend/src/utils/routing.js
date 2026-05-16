const ORS_API_KEY = process.env.NEXT_PUBLIC_ORS_API_KEY;

// OpenRouteService devuelve cada paso con un "type" numérico que indica la maniobra.
// Lo traducimos a una clave de i18n para mostrar la instrucción en el idioma del usuario.
const TIPO_A_CLAVE_I18N = {
  0: "routing.continue",
  1: "routing.turnRight",
  2: "routing.turnLeft",
  3: "routing.turnSharpRight",
  4: "routing.turnSharpLeft",
  5: "routing.turnSlightRight",
  6: "routing.turnSlightLeft",
  7: "routing.continue",
  10: "routing.roundabout",
  11: "routing.head",
  12: "routing.arrive",
};

export function obtenerClaveInstruccion(tipo) {
  return TIPO_A_CLAVE_I18N[tipo] || "routing.continue";
}

export async function obtenerRutaPasoAPaso(origen, destino, idioma = "es") {
  if (!ORS_API_KEY) {
    console.error("Falta NEXT_PUBLIC_ORS_API_KEY en .env.local");
    return null;
  }

  const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${ORS_API_KEY}&start=${origen.lng},${origen.lat}&end=${destino.lng},${destino.lat}&language=${idioma}&instructions=true&instructions_format=text`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const route = data.features[0];
    const geometry = route.geometry.coordinates;
    const steps = route.properties.segments[0].steps;

    return {
      coordenadas: geometry.map(([lng, lat]) => ({ lat, lng })),
      pasos: steps.map((step, index) => ({
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
