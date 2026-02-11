"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import CardCircuitos from "./CardCircuitos";

export default function CircuitosRecomendados({ circuitos }) {
  const router = useRouter();

  if (!circuitos || circuitos.length === 0) {
    return null;
  }

  const getClimaIcon = (clima) => {
    switch (clima) {
      case "soleado":
        return <WbSunnyIcon sx={{ color: "#FFA726", fontSize: 20 }} />;
      case "lluvioso":
        return <UmbrellaIcon sx={{ color: "#42A5F5", fontSize: 20 }} />;
      default:
        return <CloudIcon sx={{ color: "#90A4AE", fontSize: 20 }} />;
    }
  };

  const getClimaTexto = (clima) => {
    switch (clima) {
      case "soleado":
        return "Hoy es un día soleado";
      case "lluvioso":
        return "Hoy es un día lluvioso";
      default:
        return "Hoy es un día nublado";
    }
  };

  const climaActual = circuitos[0]?.clima_actual || "soleado";

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          textTransform: "uppercase",
          color: "text.secondary",
          fontSize: 11,
          letterSpacing: 0.5,
          mb: 1.5,
        }}
      >
        RECOMENDADOS
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        {getClimaIcon(climaActual)}
        <Typography variant="body2" color="text.secondary">
          {getClimaTexto(climaActual)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {circuitos.slice(0, 3).map((item) => {
          const circuitoData = {
            circuito_id: item.circuito_id,
            nombre: item.nombre,
            descripcion: item.descripcion,
            duracion_estimada_minutos: item.duracion_estimada,
            distancia_total_metros: item.distancia_total,
            url_imagen_portada: item.imagen_url,
            progreso_porcentaje: item.progreso_porcentaje || 0,
          };

          return (
            <Box key={item.circuito_id} sx={{ width: "100%" }}>
              <CardCircuitos
                circuito={circuitoData}
                onClick={() => router.push(`/circuito/${item.circuito_id}`)}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
