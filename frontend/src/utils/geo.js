export function calcularDistanciaMetros(lat1, lon1, lat2, lon2) {
  const R = 6371000;
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

const MODOS_POR_ID = { 1: "a_pie", 2: "auto", 3: "bicicleta" };

export function normalizarModoTransporte(modo) {
  if (!modo) return "a_pie";
  if (typeof modo === "number") return MODOS_POR_ID[modo] || "a_pie";
  const lower = modo.toLowerCase();
  if (lower.includes("pie")) return "a_pie";
  if (lower.includes("auto")) return "auto";
  if (lower.includes("bici")) return "bicicleta";
  return modo;
}

export function estimarDuracion(distanciaMetros, modoTransporte = "a_pie") {
  const velocidades = { a_pie: 5, bicicleta: 15, auto: 40 };
  const modo = normalizarModoTransporte(modoTransporte);
  const velocidad = velocidades[modo] || 5;
  const distanciaKm = distanciaMetros / 1000;
  const minutos = Math.round((distanciaKm / velocidad) * 60);
  return Math.max(minutos, 1);
}
