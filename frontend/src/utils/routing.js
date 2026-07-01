const ORS_API_KEY = process.env.NEXT_PUBLIC_ORS_API_KEY;

const PERFIL_POR_MODO = {
  1: "foot-walking", // a pie
  2: "driving-car", // automóvil
  3: "cycling-regular", // bicicleta
};

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

export async function obtenerRutaPasoAPaso(origen, destino, idioma = "es", modoTransporteId = 1) {
  if (!ORS_API_KEY) {
    console.error("Falta NEXT_PUBLIC_ORS_API_KEY en .env.local");
    return null;
  }

  const perfil = PERFIL_POR_MODO[modoTransporteId] || "foot-walking";
  const url = `https://api.openrouteservice.org/v2/directions/${perfil}?api_key=${ORS_API_KEY}&start=${origen.lng},${origen.lat}&end=${destino.lng},${destino.lat}&language=${idioma}&instructions=true&instructions_format=text`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const route = data.features[0];
    const geometry = route.geometry.coordinates;
    const steps = route.properties.segments[0].steps;

    const coordenadas = geometry.map(([lng, lat]) => ({ lat, lng }));

    return {
      coordenadas,
      pasos: steps.map((step, index) => ({
        instruccionOriginal: step.instruction,
        distancia: step.distance,
        duracion: step.duration,
        tipo: step.type,
        nombreCalle: step.name && step.name !== "-" ? step.name : null,
        indice: index,
        waypointInicio: step.way_points ? step.way_points[0] : null,
        waypointFin: step.way_points ? step.way_points[1] : null,
        coordenadas: step.way_points
          ? coordenadas.slice(step.way_points[0], step.way_points[1] + 1)
          : [],
      })),
      distanciaTotal: route.properties.segments[0].distance,
      duracionTotal: route.properties.segments[0].duration,
    };
  } catch (error) {
    console.error("Error al obtener ruta:", error);
    return null;
  }
}
