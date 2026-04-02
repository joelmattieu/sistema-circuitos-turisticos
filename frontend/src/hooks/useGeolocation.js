"use client";

import { useState, useEffect } from "react";

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation no está soportada en este navegador");
      setIsLoading(false);
      return;
    }

    const opciones = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };

    const onExito = (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      setLocation({ latitude, longitude, accuracy });
      setError(null);
      setIsLoading(false);
    };

    const onError = (err) => {
      setError(err.code === 1 ? "Permiso de ubicación denegado" : "Error al obtener ubicación");
      setIsLoading(false);
    };

    // Obtener posición inicial
    navigator.geolocation.getCurrentPosition(onExito, onError, opciones);

    // Rastrear cambios continuos
    const watchId = navigator.geolocation.watchPosition(onExito, onError, opciones);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error, isLoading };
}
