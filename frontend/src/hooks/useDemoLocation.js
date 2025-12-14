"use client";

import { useState, useCallback, useEffect } from "react";
import { obtenerRutaPasoAPaso } from "@/utils/routing";

export function useDemoLocation(pois) {
  const [demoEnabled, setDemoEnabled] = useState(false);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const [rutaCompleta, setRutaCompleta] = useState([]);
  const [pasosNavegacion, setPasosNavegacion] = useState([]);
  const [pasoActual, setPasoActual] = useState(null);
  const [modoAutomatico, setModoAutomatico] = useState(false);
  const [cargandoRuta, setCargandoRuta] = useState(false);

  useEffect(() => {
    async function generarRuta() {
      if (!pois || pois.length === 0) return;

      setCargandoRuta(true);
      const todosLosPasos = [];
      const todasLasCoordenadas = [];

      for (let i = 0; i < pois.length; i++) {
        const origen =
          i === 0
            ? { lat: -31.418359, lng: -64.184643 }
            : { lat: pois[i - 1].latitud, lng: pois[i - 1].longitud };

        const destino = { lat: pois[i].latitud, lng: pois[i].longitud };

        const ruta = await obtenerRutaPasoAPaso(origen, destino);

        if (ruta) {
          todosLosPasos.push(
            ...ruta.pasos.map((paso) => ({
              ...paso,
              poiDestino: i,
              nombrePOI: pois[i].nombre,
              poiCompleto: pois[i],
            }))
          );
          todasLasCoordenadas.push(...ruta.coordenadas);
        }
      }

      setPasosNavegacion(todosLosPasos);
      setRutaCompleta(todasLasCoordenadas);
      setCargandoRuta(false);

      if (todosLosPasos.length > 0) {
        setPasoActual(todosLosPasos[0]);
      }
    }

    generarRuta();
  }, [pois]);

  useEffect(() => {
    if (!modoAutomatico || !demoEnabled || rutaCompleta.length === 0) return;

    const interval = setInterval(() => {
      setCurrentWaypointIndex((prev) => {
        if (prev >= rutaCompleta.length - 1) {
          setModoAutomatico(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [modoAutomatico, demoEnabled, rutaCompleta]);

  useEffect(() => {
    if (pasosNavegacion.length === 0 || rutaCompleta.length === 0) return;

    let distanciaAcumulada = 0;
    let pasoEncontrado = 0;

    const distanciaTotal = pasosNavegacion.reduce(
      (sum, p) => sum + p.distancia,
      0
    );

    const progresoEnMetros =
      (currentWaypointIndex / rutaCompleta.length) * distanciaTotal;

    for (let i = 0; i < pasosNavegacion.length; i++) {
      distanciaAcumulada += pasosNavegacion[i].distancia;

      if (progresoEnMetros <= distanciaAcumulada) {
        pasoEncontrado = i;
        break;
      }
    }

    const nuevoPaso = pasosNavegacion[pasoEncontrado];
    setPasoActual(nuevoPaso);
  }, [currentWaypointIndex, pasosNavegacion, rutaCompleta]);

  const getCurrentLocation = useCallback(() => {
    if (!demoEnabled || rutaCompleta.length === 0) return null;
    const waypoint = rutaCompleta[currentWaypointIndex] || rutaCompleta[0];

    return {
      latitude: waypoint.lat,
      longitude: waypoint.lng,
      accuracy: 10,
    };
  }, [demoEnabled, rutaCompleta, currentWaypointIndex]);

  const getEstadoActual = useCallback(() => {
    if (!pois || rutaCompleta.length === 0) {
      return { currentPoiIndex: 0, proximityLevel: 0 };
    }

    const ubicacionActual = getCurrentLocation();
    if (!ubicacionActual) {
      return { currentPoiIndex: 0, proximityLevel: 0 };
    }

    let poiMasCercano = 0;
    let distanciaMinima = Infinity;

    pois.forEach((poi, index) => {
      const R = 6371000;
      const dLat = (poi.latitud - ubicacionActual.latitude) * (Math.PI / 180);
      const dLng = (poi.longitud - ubicacionActual.longitude) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(ubicacionActual.latitude * (Math.PI / 180)) *
          Math.cos(poi.latitud * (Math.PI / 180)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distancia = R * c;

      if (distancia < distanciaMinima) {
        distanciaMinima = distancia;
        poiMasCercano = index;
      }
    });

    let proximityLevel = 0;
    if (distanciaMinima < 10) proximityLevel = 3;
    else if (distanciaMinima < 50) proximityLevel = 2;
    else if (distanciaMinima < 150) proximityLevel = 1;
    else proximityLevel = 0;

    return {
      currentPoiIndex: poiMasCercano,
      proximityLevel,
      distancia: Math.round(distanciaMinima),
    };
  }, [pois, rutaCompleta, getCurrentLocation, currentWaypointIndex]);

  const estado = getEstadoActual();

  return {
    demoEnabled,
    currentLocation: getCurrentLocation(),
    currentPoiIndex: estado.currentPoiIndex,
    proximityLevel: estado.proximityLevel,
    distancia: estado.distancia,
    pasoActual,
    proximoPOI: pasoActual?.poiCompleto || null,
    progreso:
      rutaCompleta.length > 0
        ? Math.round((currentWaypointIndex / rutaCompleta.length) * 100)
        : 0,
    modoAutomatico,
    cargandoRuta,
    avanzar: useCallback(() => {
      setCurrentWaypointIndex((prev) =>
        Math.min(prev + 1, rutaCompleta.length - 1)
      );
    }, [rutaCompleta]),
    retroceder: useCallback(() => {
      setCurrentWaypointIndex((prev) => Math.max(prev - 1, 0));
    }, []),
    avanzarRapido: useCallback(() => {
      setCurrentWaypointIndex((prev) =>
        Math.min(prev + 10, rutaCompleta.length - 1)
      );
    }, [rutaCompleta]),
    retrocederRapido: useCallback(() => {
      setCurrentWaypointIndex((prev) => Math.max(prev - 10, 0));
    }, []),
    toggleDemo: useCallback(() => {
      setDemoEnabled((prev) => !prev);
      if (!demoEnabled) {
        setCurrentWaypointIndex(0);
        setModoAutomatico(false);
      }
    }, [demoEnabled]),
    toggleAutomatico: useCallback(() => {
      setModoAutomatico((prev) => !prev);
    }, []),
    reiniciar: useCallback(() => {
      setCurrentWaypointIndex(0);
      setModoAutomatico(false);
      if (pasosNavegacion.length > 0) {
        setPasoActual(pasosNavegacion[0]);
      }
    }, [pasosNavegacion]),
  };
}
