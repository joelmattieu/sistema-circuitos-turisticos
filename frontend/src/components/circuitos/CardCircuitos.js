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
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          transform: "translateY(-1px)",
          transition: "all 0.2s ease-in-out",
        },
        mb: 2,
        width: "100%",
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ p: 3, width: "100%" }}>
        {" "}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          gap={3}
        >
          <Box display="flex" alignItems="center" gap={2} flex={1} minWidth={0}>
            <Avatar
              src={circuito.url_imagen_portada}
              sx={{
                width: 48,
                height: 48,
                bgcolor: "primary.main",
                flexShrink: 0,
              }}
            >
              {circuito.nombre?.charAt(0)}
            </Avatar>

            <Box flex={1} minWidth={0}>
              {" "}
              <Typography
                variant="body1"
                component="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: "13.5px",
                  lineHeight: 1.3,
                  mb: 0.5,
                  color: "#000",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
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
                  color: "#666",
                }}
              >
                {(circuito.distancia_total_metros / 1000).toFixed(1)} km •{" "}
                {circuito.duracion_estimada_minutos} min
              </Typography>
            </Box>
          </Box>

          <Box flexShrink={0} ml={2}>
            {" "}
            <CircularProgressIndicator percentage={0} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const CircularProgressIndicator = ({ percentage = 0 }) => {
  const radius = 18;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        position: "relative",
      }}
    >
      <svg width="40" height="40" style={{ transform: "rotate(-90deg)" }}>

        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="#FB8C00"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>
    </Box>
  );
};

export default CardCircuitos;
