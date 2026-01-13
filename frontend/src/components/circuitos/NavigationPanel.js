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

function obtenerIconoPorTipo(tipo) {
  const iconos = {
    0: <StraightIcon sx={{ fontSize: 28, color: "#1976d2" }} />,
    1: <TurnRightIcon sx={{ fontSize: 28, color: "#1976d2" }} />,
    2: <TurnLeftIcon sx={{ fontSize: 28, color: "#1976d2" }} />,
    3: <TurnRightIcon sx={{ fontSize: 28, color: "#1976d2" }} />,
    4: <TurnLeftIcon sx={{ fontSize: 28, color: "#1976d2" }} />,
    5: <TurnRightIcon sx={{ fontSize: 28, color: "#1976d2" }} />,
    6: <TurnLeftIcon sx={{ fontSize: 28, color: "#1976d2" }} />,
    7: <StraightIcon sx={{ fontSize: 28, color: "#1976d2" }} />,
    10: <NorthIcon sx={{ fontSize: 28, color: "#1976d2" }} />,
    11: <NorthIcon sx={{ fontSize: 28, color: "#1976d2" }} />,
    12: <LocationOnIcon sx={{ fontSize: 28, color: "#1976d2" }} />,
  };
  return (
    iconos[tipo] || <StraightIcon sx={{ fontSize: 28, color: "#1976d2" }} />
  );
}

export default function NavigationPanel({
  userLocation,
  proximoPOI,
  modoTransporte = "a_pie",
  onARButtonClick,
  pasoActual,
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

    return {
      distanciaKm,
      distanciaMetros,
      minutos,
      estaProximo,
    };
  }, [userLocation, proximoPOI, modoTransporte]);

  if (!infoProximoPOI || !proximoPOI) {
    return null;
  }

  const { estaProximo, distanciaMetros, minutos } = infoProximoPOI;

  // Estado: Llegaste al punto de interés
  if (estaProximo) {
    return (
      <Box
        sx={{
          width: "100%",
          bgcolor: "#FFFFFF",
          borderRadius: 3,
          p: 2.5,
          mt: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        }}
      >
        {/* Encabezado con ícono de ubicación */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <LocationOnIcon sx={{ color: "#e91e63", fontSize: 22 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              color: "#1a1a1a",
            }}
          >
            Llegaste a: {proximoPOI.nombre}
          </Typography>
        </Box>

        {/* Subtítulo */}
        <Typography
          variant="body2"
          sx={{
            color: "#666",
            mb: 2,
            fontSize: "0.875rem",
          }}
        >
          Explora en Realidad Aumentada
        </Typography>

        {/* Botón de Realidad Aumentada */}
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
            py: 1.5,
            borderRadius: 2.5,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            boxShadow: "0 4px 12px rgba(255, 152, 0, 0.35)",
            "&:hover": {
              bgcolor: "#f57c00",
              boxShadow: "0 6px 16px rgba(255, 152, 0, 0.45)",
            },
          }}
        >
          Abrir en RA
        </Button>
      </Box>
    );
  }

  // Estado: Navegando hacia el punto de interés
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#FFFFFF",
        borderRadius: 3,
        p: 2,
        mt: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      }}
    >
      {/* Instrucción principal con ícono */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          mb: 1.5,
        }}
      >
        {/* Ícono de dirección */}
        <Box
          sx={{
            flexShrink: 0,
            mt: 0.25,
          }}
        >
          {pasoActual ? (
            obtenerIconoPorTipo(pasoActual.tipo)
          ) : (
            <NorthIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          )}
        </Box>

        {/* Texto de instrucción */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: 1.4,
            color: "#1a1a1a",
            flex: 1,
          }}
        >
          {pasoActual
            ? pasoActual.instruccion
            : `A ${Math.round(distanciaMetros)} metros`}
        </Typography>
      </Box>

      {/* Línea separadora */}
      <Box
        sx={{
          height: "1px",
          bgcolor: "#e0e0e0",
          mb: 1.5,
        }}
      />

      {/* Información del próximo destino */}
      <Typography
        variant="body2"
        sx={{
          color: "#666",
          fontSize: "0.875rem",
          lineHeight: 1.5,
        }}
      >
        Próximo destino: {proximoPOI.nombre} · {Math.round(distanciaMetros)} m ·{" "}
        {minutos} min a pie
      </Typography>
    </Box>
  );
}
