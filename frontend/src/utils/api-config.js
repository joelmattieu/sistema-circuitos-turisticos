/**
 * Detecta la URL del backend automáticamente según el host del navegador
 * Si hay NEXT_PUBLIC_API_URL definida, la usa (para desarrollo específico)
 * En cliente, usa el mismo host pero puerto 8000
 */
export const getBackendURL = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof window !== "undefined") {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:8000`;
  }

  return "http://localhost:8000";
};
