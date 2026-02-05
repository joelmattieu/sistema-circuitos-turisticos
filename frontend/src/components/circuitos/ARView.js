// Vista de Realidad Aumentada - tarjetas informativas sobre cámara

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography, Paper, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlaceIcon from "@mui/icons-material/Place";
import HistoryIcon from "@mui/icons-material/History";
import PaletteIcon from "@mui/icons-material/Palette";

export default function ARView({ poi, userLocation, demoMode, onClose }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [distancia, setDistancia] = useState(null);
  const [motion, setMotion] = useState({ x: 0, y: 0 });
  const [orientationPermission, setOrientationPermission] = useState(true);

  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
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
  };

  useEffect(() => {
    if (!poi || !userLocation) return;

    const dist = calcularDistancia(
      userLocation.latitude,
      userLocation.longitude,
      poi.latitud,
      poi.longitud,
    );
    setDistancia(dist);
  }, [poi, userLocation]);

  // Init cámara
  useEffect(() => {
    let stream = null;
    const video = videoRef.current;

    const initCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });

        if (video) {
          video.srcObject = stream;
          video.play();
        }
      } catch (err) {
        console.error("Error al inicializar cámara:", err);
        setError(
          err.name === "NotAllowedError"
            ? "Debes permitir el acceso a la cámara para usar AR."
            : "No se pudo inicializar la cámara.",
        );
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (video && video.srcObject) {
        video.srcObject = null;
      }
    };
  }, []); // Solo inicializar cámara una vez

  // Sensor de orientación separado
  useEffect(() => {
    const requestPermission = async () => {
      // Para iOS 13+ necesitas pedir permiso
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === "granted") {
            setOrientationPermission(true);
          } else {
            setOrientationPermission(false);
          }
        } catch (error) {
          console.error("Error solicitando permiso:", error);
          setOrientationPermission(false);
        }
      } else {
        setOrientationPermission(true);
      }
    };

    const handleOrientation = (event) => {
      // beta: inclinación adelante/atrás (-180 a 180)
      // gamma: inclinación izquierda/derecha (-90 a 90)

      const beta = event.beta || 0;
      const gamma = event.gamma || 0;

      const maxRotation = 30;

      const x = Math.max(-maxRotation, Math.min(maxRotation, -(beta / 3)));
      const y = Math.max(-maxRotation, Math.min(maxRotation, gamma / 3));

      setMotion({ x, y });
    };

    requestPermission();

    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  if (error) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 9999,
          bgcolor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          {error}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "white",
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        bgcolor: "black",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 100,
          color: "white",
          bgcolor: "rgba(0,0,0,0.6)",
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.8)",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      {!orientationPermission && (
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
            bgcolor: "rgba(255,255,255,0.95)",
            px: 3,
            py: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Activar sensor de movimiento
          </Typography>
          <button
            onClick={async () => {
              if (
                typeof DeviceOrientationEvent.requestPermission === "function"
              ) {
                const permission =
                  await DeviceOrientationEvent.requestPermission();
                setOrientationPermission(permission === "granted");
              }
            }}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Activar
          </button>
        </Paper>
      )}

      <Paper
        elevation={8}
        sx={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: `translateX(-50%) perspective(1000px) rotateX(${motion.x * 1.0}deg) rotateY(${motion.y * 1.0}deg)`,
          transformStyle: "preserve-3d",
          bgcolor: "rgba(255, 255, 255, 0.95)",
          px: 3,
          py: 2,
          borderRadius: 3,
          minWidth: 280,
          maxWidth: "85%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#424242",
            mb: 0.5,
          }}
        >
          {poi?.nombre || "Punto de Interés"}
        </Typography>
      </Paper>

      {poi?.fecha_inauguracion && (
        <Paper
          elevation={6}
          sx={{
            position: "absolute",
            top: "40%",
            right: "8%",
            transform: `perspective(1000px) rotateX(${motion.x * 0.8}deg) rotateY(${motion.y * 0.8}deg)`,
            transformStyle: "preserve-3d",
            bgcolor: "rgba(255, 255, 255, 0.93)",
            px: 2.5,
            py: 1.8,
            borderRadius: 2.5,
            minWidth: 200,
            maxWidth: "45%",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 0.5,
            }}
          >
            <HistoryIcon sx={{ color: "#FF6B6B", fontSize: 20 }} />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: "#424242",
              }}
            >
              {poi.fecha_inauguracion}
            </Typography>
          </Box>
        </Paper>
      )}

      {(poi?.dato_historico || poi?.informacion_cultural) && (
        <Paper
          elevation={6}
          sx={{
            position: "absolute",
            bottom: "25%",
            left: "10%",
            transform: `perspective(1000px) rotateX(${motion.x * 1.0}deg) rotateY(${motion.y * 1.0}deg)`,
            transformStyle: "preserve-3d",
            bgcolor: "rgba(255, 255, 255, 0.93)",
            px: 2.5,
            py: 2,
            borderRadius: 2.5,
            minWidth: 220,
            maxWidth: "50%",
            textAlign: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 0.5,
            }}
          >
            <PaletteIcon sx={{ color: "#4CAF50", fontSize: 22 }} />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: "#424242",
              }}
            >
              {poi.dato_historico || "Información Cultural"}
            </Typography>
          </Box>
          {poi?.informacion_cultural && (
            <Typography
              variant="body2"
              sx={{
                color: "#616161",
                mt: 0.5,
              }}
            >
              {poi.informacion_cultural}
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
}
