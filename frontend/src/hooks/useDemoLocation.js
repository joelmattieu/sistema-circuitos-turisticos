"use client";

import { useState, useCallback, useEffect } from "react";
import { obtenerRutaPasoAPaso } from "@/utils/routing";

const INICIO_DEMO = { lat: -31.418359, lng: -64.184643 };

function obtenerPuntoInicio(demoEnabled, demoStartLocation, realLocation) {
  if (demoEnabled && demoStartLocation) {
    return {
      lat: demoStartLocation.latitude || demoStartLocation.lat,
      lng: demoStartLocation.longitude || demoStartLocation.lng,
    };
  }
  if (demoEnabled) return INICIO_DEMO;
  if (realLocation) {
    return { lat: realLocation.latitude, lng: realLocation.longitude };
  }
  return INICIO_DEMO;
}

export function useDemoLocation(
  pois,
  realLocation = null,
  demoStartLocation = null,
  idioma = "es",
  modoTransporteId = 1,
) {
  const [demoEnabled, setDemoEnabled] = useState(false);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const [rutaCompleta, setRutaCompleta] = useState([]);
  const [pasosNavegacion, setPasosNavegacion] = useState([]);
  const [pasoActual, setPasoActual] = useState(null);

  useEffect(() => {
    setRutaCompleta([]);
    setPasosNavegacion([]);
    setPasoActual(null);
    setCurrentWaypointIndex(0);
  }, [demoEnabled, idioma, modoTransporteId]);

  // Cuando hay POIs y todavía no calculé la ruta, llamo a OpenRouteService por cada tramo entre POIs y voy juntando todas las coordenadas y todas las instrucciones en dos listas grandes.
  useEffect(() => {
    if (!pois || pois.length === 0) return;
    if (rutaCompleta.length > 0) return;

    async function generarRuta() {
      const todosLosPasos = [];
      const todasLasCoordenadas = [];
      const puntoInicio = obtenerPuntoInicio(
        demoEnabled,
        demoStartLocation,
        realLocation,
      );

      for (let i = 0; i < pois.length; i++) {
        const origen =
          i === 0
            ? puntoInicio
            : { lat: pois[i - 1].latitud, lng: pois[i - 1].longitud };
        const destino = { lat: pois[i].latitud, lng: pois[i].longitud };

        try {
          const ruta = await obtenerRutaPasoAPaso(
            origen,
            destino,
            idioma,
            modoTransporteId,
          );

          if (ruta) {
            const offset = todasLasCoordenadas.length;
            const pasosConPOI = ruta.pasos.map((paso) => ({
              ...paso,
              poiDestino: i,
              nombrePOI: pois[i].nombre,
              poiCompleto: pois[i],
              coordInicio: offset + (paso.waypointInicio ?? 0),
              coordFin: offset + (paso.waypointFin ?? 0),
            }));
            todosLosPasos.push(...pasosConPOI);
            todasLasCoordenadas.push(...ruta.coordenadas);
          }
        } catch (error) {
          console.error(`Error obteniendo ruta para POI ${i}:`, error);
          todasLasCoordenadas.push(origen, destino);
        }
      }

      const pasosFiltrados = todosLosPasos.filter((paso) => paso.distancia > 0);

      setPasosNavegacion(pasosFiltrados);
      setRutaCompleta(todasLasCoordenadas);

      if (pasosFiltrados.length > 0) {
        setPasoActual(pasosFiltrados[0]);
      }
    }

    generarRuta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pois, demoEnabled, rutaCompleta.length]);
  
  useEffect(() => {
    if (pasosNavegacion.length === 0) return;

    const paso =
      pasosNavegacion.find(
        (p) =>
          currentWaypointIndex >= p.coordInicio &&
          currentWaypointIndex <= p.coordFin,
      ) || pasosNavegacion[pasosNavegacion.length - 1];

    setPasoActual(paso);
  }, [currentWaypointIndex, pasosNavegacion]);

  const getCurrentLocation = useCallback(() => {
    if (!demoEnabled) return null;

    if (rutaCompleta.length === 0) {
      const inicio = demoStartLocation || INICIO_DEMO;
      return {
        latitude: inicio.latitude || inicio.lat,
        longitude: inicio.longitude || inicio.lng,
        accuracy: 10,
      };
    }

    const waypoint = rutaCompleta[currentWaypointIndex] || rutaCompleta[0];
    return {
      latitude: waypoint.lat,
      longitude: waypoint.lng,
      accuracy: 10,
    };
  }, [demoEnabled, rutaCompleta, currentWaypointIndex, demoStartLocation]);

  const avanzar = useCallback(() => {
    setCurrentWaypointIndex((prev) =>
      Math.min(prev + 1, rutaCompleta.length - 1),
    );
  }, [rutaCompleta]);

  const retroceder = useCallback(() => {
    setCurrentWaypointIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleDemo = useCallback(() => {
    setDemoEnabled((prev) => !prev);
    if (!demoEnabled) {
      setCurrentWaypointIndex(0);
    }
  }, [demoEnabled]);

  return {
    demoEnabled,
    currentLocation: getCurrentLocation(),
    pasoActual,
    proximoPOI: pasoActual?.poiCompleto || null,
    rutaCompleta,
    avanzar,
    retroceder,
    toggleDemo,
  };
}
