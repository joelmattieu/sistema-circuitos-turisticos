"use client";
import React from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import CircularProgressIndicator from "./CircularProgressIndicator";
import { useDistanceFormatter } from "@/hooks/useDistance";

const CardCircuitos = ({ circuito, onClick }) => {
  const { formatDistance } = useDistanceFormatter();

  const handleClick = () => {
    if (onClick) {
      onClick(circuito.circuito_id);
    }
  };

  const distanciaDisplay = formatDistance(
    circuito.distancia_total_metros,
    circuito.distancia_formateada,
    circuito.unidad_medicion
  );

  return (
    <Card
      sx={{
        cursor: "pointer",
        borderRadius: 3,
        boxShadow: "0 4px 4px 0px rgba(0,0,0,0.25)",
        "&:hover": {
          boxShadow: "0 8px 12px 0px rgba(0,0,0,0.2)",
          transform: "translateY(-2px)",
          transition: "all 0.2s ease-in-out",
        },
        mb: 1,
        width: "100%",
      }}
      onClick={handleClick}
    >
      <CardContent
        sx={{
          px: 3,
          py: 2.5,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          "&:last-child": { pb: 2.5 },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          gap={1}
        >
          <Box display="flex" alignItems="center" gap={1.8} flex={1} minWidth={0}>
            <Avatar
              src={circuito.url_imagen_portada}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "primary.main",
                flexShrink: 0,
              }}
            >
              {circuito.nombre?.charAt(0)}
            </Avatar>

            <Box flex={1} minWidth={0}>
              <Typography
                variant="body1"
                component="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: "13.5px",
                  lineHeight: 1.2,
                  mb: 0.3,
                  color: "#000",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {circuito.nombre}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "#000",
                }}
              >
                {distanciaDisplay} • {circuito.duracion_estimada_minutos} min
              </Typography>
            </Box>
          </Box>

          <Box flexShrink={0}>
            <CircularProgressIndicator percentage={0} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardCircuitos;
