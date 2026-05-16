/**
 * Calcula la distancia en metros entre dos puntos GPS usando la fórmula Haversine.
 */
export function calcularDistanciaMetros(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radio de la Tierra en metros
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Mapeo de ID de modo de transporte a nombre interno
const MODOS_POR_ID = { 1: "a_pie", 2: "auto", 3: "bicicleta" };

// Normaliza el modo de transporte: acepta ID (1,2,3) o nombre ("a_pie","auto","bicicleta","A pie","Automóvil","Bicicleta")
export function normalizarModoTransporte(modo) {
  if (!modo) return "a_pie";
  if (typeof modo === "number") return MODOS_POR_ID[modo] || "a_pie";
  const lower = modo.toLowerCase();
  if (lower.includes("pie")) return "a_pie";
  if (lower.includes("auto")) return "auto";
  if (lower.includes("bici")) return "bicicleta";
  return modo;
}

// Estima duración en minutos según distancia y modo de transporte
export function estimarDuracion(distanciaMetros, modoTransporte = "a_pie") {
  const velocidades = { a_pie: 5, bicicleta: 15, auto: 40 }; // km/h
  const modo = normalizarModoTransporte(modoTransporte);
  const velocidad = velocidades[modo] || 5;
  const distanciaKm = distanciaMetros / 1000;
  const minutos = Math.round((distanciaKm / velocidad) * 60);
  return Math.max(minutos, 1);
}
