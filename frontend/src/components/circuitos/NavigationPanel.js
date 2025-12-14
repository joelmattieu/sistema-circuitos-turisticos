"use client";

import { useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import StraightIcon from "@mui/icons-material/Straight";
import NorthIcon from "@mui/icons-material/North";

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371;
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

function estimarTiempo(distanciaKm, modoTransporte = "a_pie") {
  const velocidades = {
    a_pie: 5,
    bicicleta: 15,
    auto: 40,
  };
  const velocidad = velocidades[modoTransporte] || 5;
  const minutos = Math.round((distanciaKm / velocidad) * 60);
  return Math.max(minutos, 1);
}

function calcularBearing(lat1, lon1, lat2, lon2) {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.cos(dLon);
  const brng = Math.atan2(y, x);
  return ((brng * 180) / Math.PI + 360) % 360;
}

function obtenerDireccion(bearing) {
  if (bearing >= 337.5 || bearing < 22.5)
    return { texto: "continúa en", icono: <NorthIcon /> };
  if (bearing >= 22.5 && bearing < 67.5)
    return { texto: "gira a la derecha en", icono: <TurnRightIcon /> };
  if (bearing >= 67.5 && bearing < 112.5)
    return { texto: "gira a la derecha en", icono: <TurnRightIcon /> };
  if (bearing >= 112.5 && bearing < 157.5)
    return { texto: "gira a la derecha en", icono: <TurnRightIcon /> };
  if (bearing >= 157.5 && bearing < 202.5)
    return { texto: "continúa en", icono: <StraightIcon /> };
  if (bearing >= 202.5 && bearing < 247.5)
    return { texto: "gira a la izquierda en", icono: <TurnLeftIcon /> };
  if (bearing >= 247.5 && bearing < 292.5)
    return { texto: "gira a la izquierda en", icono: <TurnLeftIcon /> };
  if (bearing >= 292.5 && bearing < 337.5)
    return { texto: "gira a la izquierda en", icono: <TurnLeftIcon /> };
  return { texto: "continúa en", icono: <StraightIcon /> };
}

// Función para obtener icono según tipo de maniobra de la API
function obtenerIconoPorTipo(tipo) {
  const iconos = {
    0: <StraightIcon />,
    1: <TurnRightIcon />,
    2: <TurnLeftIcon />,
    3: <TurnRightIcon />,
    4: <TurnLeftIcon />,
    5: <TurnRightIcon />,
    6: <TurnLeftIcon />,
    7: <StraightIcon />,
    10: <NorthIcon />,
    11: <NorthIcon />,
    12: <LocationOnIcon />,
  };
  return iconos[tipo] || <StraightIcon />;
}

export default function NavigationPanel({
  userLocation,
  proximoPOI,
  circuito,
  poiActualIndice,
  modoTransporte = "a_pie",
  onARButtonClick,
  pasoActual, // ✅ Nuevo parámetro
}) {
  const infoProximoPOI = useMemo(() => {
    if (!userLocation || !proximoPOI) {
      return null;
    }

    const distanciaKm = calcularDistancia(
      userLocation.latitude,
      userLocation.longitude,
      proximoPOI.latitud,
      proximoPOI.longitud
    );

    const distanciaMetros = distanciaKm * 1000;
    const minutos = estimarTiempo(distanciaKm, modoTransporte);
    const estaProximo = distanciaMetros < 50;

    const bearing = calcularBearing(
      userLocation.latitude,
      userLocation.longitude,
      proximoPOI.latitud,
      proximoPOI.longitud
    );

    const direccion = obtenerDireccion(bearing);

    return {
      distanciaKm,
      distanciaMetros,
      minutos,
      estaProximo,
      direccion,
    };
  }, [userLocation, proximoPOI, modoTransporte]);

  if (!infoProximoPOI || !proximoPOI) {
    return null;
  }

  const { estaProximo, distanciaMetros, minutos, direccion } = infoProximoPOI;

  // Si llegó al POI
  if (estaProximo) {
    return (
      <Box
        sx={{
          width: "100%",
          bgcolor: "#fafafa",
          borderRadius: 3,
          p: 2.5,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <LocationOnIcon sx={{ color: "#f44336", fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
            Llegaste a: {proximoPOI.nombre}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "#666", mb: 2, fontSize: "0.875rem" }}
        >
          Explora en Realidad Aumentada
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={onARButtonClick}
          startIcon={<CameraAltIcon />}
          sx={{
            bgcolor: "#ff9800",
            color: "white",
            fontWeight: 600,
            fontSize: "0.875rem",
            py: 1.25,
            borderRadius: 2,
            textTransform: "uppercase",
            boxShadow: "0 2px 6px rgba(255, 152, 0, 0.3)",
            "&:hover": {
              bgcolor: "#f57c00",
              boxShadow: "0 4px 10px rgba(255, 152, 0, 0.4)",
            },
          }}
        >
          Abrir en RA
        </Button>
      </Box>
    );
  }

  // Panel de navegación normal
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "white",
        borderRadius: 2,
        p: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1.5 }}
      >
        <Box
          sx={{
            color: "#1976d2",
            fontSize: 32,
            flexShrink: 0,
            mt: 0.5,
          }}
        >
          {pasoActual ? obtenerIconoPorTipo(pasoActual.tipo) : direccion.icono}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              lineHeight: 1.3,
              mb: 0.5,
            }}
          >
            {pasoActual
              ? pasoActual.instruccion
              : `A ${Math.round(distanciaMetros)} metros ${direccion.texto} ${
                  proximoPOI.nombre
                }`}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ height: 1, bgcolor: "#e0e0e0", mb: 1.5 }} />

      <Typography
        variant="body2"
        sx={{
          color: "#666",
          fontSize: "0.875rem",
          lineHeight: 1.5,
        }}
      >
        Próximo destino: {pasoActual?.nombrePOI || proximoPOI.nombre} ·{" "}
        {pasoActual
          ? `${Math.round(pasoActual.distancia)} m`
          : `${Math.round(distanciaMetros)} m · ${minutos} min a pie`}
      </Typography>
    </Box>
  );
}
