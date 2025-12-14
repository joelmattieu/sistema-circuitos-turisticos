"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Hook para rastrear la ubicación del usuario en tiempo real
 * Usa la Geolocation API del navegador
 */
export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const watchIdRef = useRef(null);

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation no está soportada en este navegador");
      setIsLoading(false);
      return;
    }

    // Obtener ubicación inicial
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({ latitude, longitude, accuracy });
        setError(null);
        setIsLoading(false);
      },
      (error) => {
        setError(
          error.code === 1
            ? "Permiso de ubicación denegado"
            : error.code === 2
            ? "Ubicación no disponible"
            : "Error al obtener ubicación"
        );
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    // Rastrear cambios continuos
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({ latitude, longitude, accuracy });
        setError(null);
      },
      (error) => {
        console.error("Error en watchPosition:", error);
        setError(
          error.code === 1
            ? "Permiso de ubicación denegado"
            : "Error al obtener ubicación"
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    startTracking();

    return () => {
      stopTracking();
    };
  }, [startTracking, stopTracking]);

  return {
    location,
    error,
    isLoading,
    startTracking,
    stopTracking,
  };
}
