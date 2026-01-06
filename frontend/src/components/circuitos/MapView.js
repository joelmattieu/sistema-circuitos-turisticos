"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import { Box, CircularProgress, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";

const calcularDistancia = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const createNumberedIcon = (number, isProximo) => {
  const bgColor = isProximo ? "#ff9800" : "#2196f3";
  return L.divIcon({
    html: `<div style="
      width: 40px;
      height: 40px;
      background-color: ${bgColor};
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: white;
      font-size: 18px;
    ">${number}</div>`,
    iconSize: [40, 40],
    className: "numbered-icon",
  });
};

const userIcon = L.divIcon({
  html: `<div style="
    width: 40px;
    height: 40px;
    background-color: #4caf50;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <div style="
      width: 8px;
      height: 8px;
      background-color: white;
      border-radius: 50%;
    "></div>
  </div>`,
  iconSize: [40, 40],
  className: "user-icon",
});

export default function MapView({
  circuito,
  userLocation,
  proximoPOI,
  isLoading,
  rutaCompleta = [],
}) {
  const [mapCenter, setMapCenter] = useState([-31.4166057, -64.1870233]);

  useEffect(() => {
    if (userLocation?.latitude && userLocation?.longitude) {
      const timer = requestAnimationFrame(() => {
        setMapCenter([userLocation.latitude, userLocation.longitude]);
      });

      return () => cancelAnimationFrame(timer);
    }
  }, [userLocation?.latitude, userLocation?.longitude]);

  if (!circuito) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Circuito no encontrado</Typography>
      </Box>
    );
  }

  const routeCoordinates =
    circuito?.puntos_interes?.map((poi) => [poi.latitud, poi.longitud]) || [];

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            backgroundColor: "#FAFAFA",
            padding: 2,
            borderRadius: 1,
          }}
        >
          <CircularProgress />
          <Typography variant="caption">Obteniendo ubicación...</Typography>
        </Box>
      )}

      <MapContainer
        center={mapCenter}
        zoom={16}
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />

        {/* Ruta del circuito */}
        {rutaCompleta.length > 0 ? (
          // Usar la ruta real que sigue las calles
          <Polyline
            positions={rutaCompleta.map((coord) => [coord.lat, coord.lng])}
            color="#1976d2"
            weight={4}
            opacity={0.8}
            dashArray="5, 5"
          />
        ) : routeCoordinates.length > 0 ? (
          // Fallback: líneas rectas entre puntos
          <Polyline
            positions={routeCoordinates}
            color="#1976d2"
            weight={4}
            opacity={0.8}
            dashArray="5, 5"
          />
        ) : null}

        {/* Marcadores de POIs */}
        {circuito.puntos_interes?.map((poi, index) => {
          const isProximo = proximoPOI?.poi_id === poi.poi_id;
          return (
            <Marker
              key={poi.poi_id}
              position={[poi.latitud, poi.longitud]}
              icon={createNumberedIcon(index + 1, isProximo)}
            >
              <Popup>
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {poi.nombre}
                  </Typography>
                  <Typography variant="caption">
                    {poi.descripcion?.substring(0, 50)}...
                  </Typography>
                </Box>
              </Popup>
            </Marker>
          );
        })}

        {/* Ubicación del usuario */}
        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userIcon}
          >
            <Popup>
              <Typography variant="body2">Estás aquí</Typography>
            </Popup>
          </Marker>
        )}

        {/* Círculo de precisión */}
        {userLocation && userLocation.accuracy && (
          <CircleMarker
            center={[userLocation.latitude, userLocation.longitude]}
            radius={userLocation.accuracy / 111.3}
            fill={true}
            fillColor="#4caf50"
            fillOpacity={0.1}
            color="#4caf50"
            weight={2}
            dashArray="5, 5"
          />
        )}
      </MapContainer>
    </Box>
  );
}
