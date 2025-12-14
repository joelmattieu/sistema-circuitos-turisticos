"use client";

import { useState, useCallback, useEffect } from "react";

// Función para interpolar puntos entre dos coordenadas (simular caminata)
function generarWaypoints(lat1, lng1, lat2, lng2, numPuntos = 10) {
  const waypoints = [];
  for (let i = 0; i <= numPuntos; i++) {
    const ratio = i / numPuntos;
    waypoints.push({
      lat: lat1 + (lat2 - lat1) * ratio,
      lng: lng1 + (lng2 - lng1) * ratio,
    });
  }
  return waypoints;
}

// Generar ruta completa del circuito con waypoints intermedios
function generarRutaCompleta(pois) {
  if (!pois || pois.length === 0) return [];

  const rutaCompleta = [];

  for (let i = 0; i < pois.length; i++) {
    const poiActual = pois[i];

    if (i === 0) {
      // Punto de inicio: 300m antes del primer POI
      const startLat = poiActual.latitud - 0.0027;
      const startLng = poiActual.longitud - 0.0027;

      // Generar waypoints desde inicio hasta primer POI
      const waypoints = generarWaypoints(
        startLat,
        startLng,
        poiActual.latitud,
        poiActual.longitud,
        15 // 15 pasos hasta llegar
      );

      rutaCompleta.push(...waypoints);
    } else {
      // Waypoints desde POI anterior hasta POI actual
      const poiAnterior = pois[i - 1];
      const waypoints = generarWaypoints(
        poiAnterior.latitud,
        poiAnterior.longitud,
        poiActual.latitud,
        poiActual.longitud,
        20 // 20 pasos entre POIs
      );

      // Excluir el primer waypoint (ya estamos ahí)
      rutaCompleta.push(...waypoints.slice(1));
    }

    // Añadir punto exacto del POI (para asegurar que llegamos)
    rutaCompleta.push({
      lat: poiActual.latitud,
      lng: poiActual.longitud,
    });
  }

  return rutaCompleta;
}

export function useDemoLocation(pois) {
  const [demoEnabled, setDemoEnabled] = useState(false);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const [rutaCompleta, setRutaCompleta] = useState([]);
  const [modoAutomatico, setModoAutomatico] = useState(false);

  // Generar ruta completa cuando cambian los POIs
  useEffect(() => {
    if (pois && pois.length > 0) {
      const ruta = generarRutaCompleta(pois);
      setRutaCompleta(ruta);
    }
  }, [pois]);

  // Modo automático: avanzar cada 2 segundos
  useEffect(() => {
    if (!modoAutomatico || !demoEnabled || rutaCompleta.length === 0) return;

    const interval = setInterval(() => {
      setCurrentWaypointIndex((prev) => {
        if (prev >= rutaCompleta.length - 1) {
          setModoAutomatico(false); // Detener al final
          return prev;
        }
        return prev + 1;
      });
    }, 2000); // Avanzar cada 2 segundos

    return () => clearInterval(interval);
  }, [modoAutomatico, demoEnabled, rutaCompleta]);

  const getCurrentLocation = useCallback(() => {
    if (!demoEnabled || rutaCompleta.length === 0) return null;

    const waypoint = rutaCompleta[currentWaypointIndex];

    return {
      latitude: waypoint.lat,
      longitude: waypoint.lng,
      accuracy: 10,
    };
  }, [demoEnabled, rutaCompleta, currentWaypointIndex]);

  // Calcular POI actual y nivel de proximidad basado en el waypoint
  const getEstadoActual = useCallback(() => {
    if (!pois || rutaCompleta.length === 0) {
      return { currentPoiIndex: 0, proximityLevel: 0 };
    }

    // Calcular distancia al POI más cercano
    const ubicacionActual = getCurrentLocation();
    if (!ubicacionActual) {
      return { currentPoiIndex: 0, proximityLevel: 0 };
    }

    let poiMasCercano = 0;
    let distanciaMinima = Infinity;

    pois.forEach((poi, index) => {
      const R = 6371000; // Radio de la Tierra en metros
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

    // Determinar nivel de proximidad
    let proximityLevel = 0;
    if (distanciaMinima < 10) proximityLevel = 3; // Llegaste
    else if (distanciaMinima < 50) proximityLevel = 2; // Muy cerca
    else if (distanciaMinima < 150) proximityLevel = 1; // Cerca
    else proximityLevel = 0; // Lejos

    return {
      currentPoiIndex: poiMasCercano,
      proximityLevel,
      distancia: Math.round(distanciaMinima),
    };
  }, [pois, rutaCompleta, getCurrentLocation, currentWaypointIndex]);

  const avanzar = useCallback(() => {
    setCurrentWaypointIndex((prev) =>
      Math.min(prev + 1, rutaCompleta.length - 1)
    );
  }, [rutaCompleta]);

  const retroceder = useCallback(() => {
    setCurrentWaypointIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const avanzarRapido = useCallback(() => {
    setCurrentWaypointIndex((prev) =>
      Math.min(prev + 5, rutaCompleta.length - 1)
    );
  }, [rutaCompleta]);

  const retrocederRapido = useCallback(() => {
    setCurrentWaypointIndex((prev) => Math.max(prev - 5, 0));
  }, []);

  const irAPoi = useCallback(
    (poiIndex) => {
      // Buscar el waypoint más cercano a ese POI
      if (!pois || !pois[poiIndex]) return;

      const poi = pois[poiIndex];
      let waypointMasCercano = 0;
      let distanciaMinima = Infinity;

      rutaCompleta.forEach((waypoint, index) => {
        const dist = Math.sqrt(
          Math.pow(waypoint.lat - poi.latitud, 2) +
            Math.pow(waypoint.lng - poi.longitud, 2)
        );
        if (dist < distanciaMinima) {
          distanciaMinima = dist;
          waypointMasCercano = index;
        }
      });

      setCurrentWaypointIndex(waypointMasCercano);
    },
    [pois, rutaCompleta]
  );

  const toggleDemo = useCallback(() => {
    setDemoEnabled((prev) => !prev);
    if (!demoEnabled) {
      setCurrentWaypointIndex(0);
      setModoAutomatico(false);
    }
  }, [demoEnabled]);

  const toggleAutomatico = useCallback(() => {
    setModoAutomatico((prev) => !prev);
  }, []);

  const reiniciar = useCallback(() => {
    setCurrentWaypointIndex(0);
    setModoAutomatico(false);
  }, []);

  const estado = getEstadoActual();

  return {
    demoEnabled,
    currentLocation: getCurrentLocation(),
    currentPoiIndex: estado.currentPoiIndex,
    proximityLevel: estado.proximityLevel,
    distancia: estado.distancia,
    progreso:
      rutaCompleta.length > 0
        ? Math.round((currentWaypointIndex / rutaCompleta.length) * 100)
        : 0,
    modoAutomatico,
    avanzar,
    retroceder,
    avanzarRapido,
    retrocederRapido,
    irAPoi,
    toggleDemo,
    toggleAutomatico,
    reiniciar,
  };
}
