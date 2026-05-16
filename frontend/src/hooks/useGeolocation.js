"use client";

import { useState, useEffect } from "react";

const ESTADO_INICIAL = { location: null, error: null, isLoading: true };
const OPCIONES_GPS = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };

export function useGeolocation() {
  const [state, setState] = useState(ESTADO_INICIAL);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({
        location: null,
        error: "Geolocation no está soportada en este navegador",
        isLoading: false,
      });
      return;
    }

    const onExito = (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      setState({ location: { latitude, longitude, accuracy }, error: null, isLoading: false });
    };

    const onError = (err) => {
      const error = err.code === 1 ? "Permiso de ubicación denegado" : "Error al obtener ubicación";
      setState({ location: null, error, isLoading: false });
    };

    const watchId = navigator.geolocation.watchPosition(onExito, onError, OPCIONES_GPS);
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return state;
}
