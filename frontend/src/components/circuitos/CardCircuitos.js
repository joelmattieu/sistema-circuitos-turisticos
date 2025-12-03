"use client";
import React from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";

const CardCircuitos = ({ circuito, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(circuito.circuito_id);
    }
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-2px)",
          transition: "all 0.2s ease-in-out",
        },
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={circuito.url_imagen_portada}
            sx={{
              width: 56,
              height: 56,
              bgcolor: "primary.main",
            }}
          >
            {circuito.nombre?.charAt(0)}
          </Avatar>

          <Box flex={1}>
            <Typography variant="h6" component="h3" gutterBottom>
              {circuito.nombre}
            </Typography>

            <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
              {circuito.descripcion}
            </Typography>

            <Box display="flex" gap={2} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                📍 {(circuito.distancia_total_metros / 1000).toFixed(1)} km
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ⏱️ {circuito.duracion_estimada_minutos} min
              </Typography>
              {circuito.veces_finalizado > 0 && (
                <Typography variant="body2" color="text.secondary">
                  ✅ {circuito.veces_finalizado} veces
                </Typography>
              )}
            </Box>

            {circuito.categoria && (
              <Box mt={1}>
                <Typography
                  variant="caption"
                  sx={{
                    bgcolor: "primary.light",
                    color: "primary.contrastText",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: "0.7rem",
                  }}
                >
                  {circuito.categoria.nombre_categoria}
                </Typography>
              </Box>
            )}
          </Box>

          <Box>
            <CircularProgress percentage={0} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const CircularProgress = ({ percentage = 0 }) => {
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "3px solid #e0e0e0",
        borderTop: percentage > 0 ? "3px solid #1976d2" : "3px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
        {percentage}%
      </Typography>
    </Box>
  );
};

export default CardCircuitos;
