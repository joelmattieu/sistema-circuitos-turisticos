/**
 * ARView.js - Componente de Realidad Aumentada Simplificado
 *
 * Este componente implementa visualización AR usando Three.js y la cámara del dispositivo
 * para mostrar información de puntos de interés turísticos en el mundo real.
 *
 * Características:
 * - Acceso a cámara del dispositivo
 * - Overlay de información 3D sobre video en vivo
 * - Calcula distancia en tiempo real usando GPS
 * - Compatible con dispositivos móviles
 *
 * Tecnologías:
 * - Three.js: Motor 3D para renderizado WebGL
 * - MediaDevices API: Acceso a cámara del dispositivo
 * - Canvas 2D: Generación de texturas con información
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ARView({ poi, userLocation, onClose }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isARReady, setIsARReady] = useState(false);
  const [error, setError] = useState(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  /**
   * Calcula la distancia entre dos puntos GPS en kilómetros
   * Usa la fórmula del Haversine
   */
  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
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

  /**
   * Inicializa la escena AR con Three.js y la cámara del dispositivo
   */
  useEffect(() => {
    // Verificar que tenemos los datos necesarios
    if (!poi || !userLocation || !containerRef.current) {
      return;
    }

    let animationFrameId = null;
    let stream = null;
    // Guardar refs en variables locales para cleanup seguro
    const container = containerRef.current;
    const video = videoRef.current;

    /**
     * Configura la cámara del dispositivo y la escena 3D
     */
    const initAR = async () => {
      try {
        // 1. Solicitar acceso a la cámara trasera del dispositivo
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment", // Cámara trasera
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        // 2. Mostrar video de la cámara en elemento <video>
        if (video) {
          video.srcObject = stream;
          video.play();
        }

        // 3. Importar Three.js dinámicamente
        const THREE = await import("three");

        // 4. Crear escena 3D
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // 5. Configurar cámara 3D
        const camera = new THREE.PerspectiveCamera(
          70, // Campo de visión amplio
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.z = 0;
        cameraRef.current = camera;

        // 6. Crear renderizador WebGL con fondo transparente
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // 7. Crear tarjeta de información del POI
        const distancia = calcularDistancia(
          userLocation.latitude,
          userLocation.longitude,
          poi.latitud,
          poi.longitud
        );

        // Generar textura con Canvas 2D
        const cardTexture = createInfoCard(poi, distancia, THREE);

        // Crear geometría y material
        const geometry = new THREE.PlaneGeometry(3, 1.5);
        const material = new THREE.MeshBasicMaterial({
          map: cardTexture,
          transparent: true,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, -5); // 5 metros frente a la cámara
        scene.add(mesh);
        meshRef.current = mesh;

        // Agregar luz ambiental
        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);

        setIsARReady(true);

        /**
         * Loop de animación - mantiene la tarjeta orientada hacia la cámara (billboard)
         */
        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);

          // Mantener la tarjeta siempre mirando a la cámara para mejor legibilidad
          if (meshRef.current && cameraRef.current) {
            meshRef.current.lookAt(cameraRef.current.position);
          }

          renderer.render(scene, camera);
        };

        animate();
      } catch (err) {
        console.error("Error al inicializar AR:", err);
        setError(
          err.name === "NotAllowedError"
            ? "Debes permitir el acceso a la cámara para usar AR."
            : "No se pudo inicializar la cámara. Verifica los permisos."
        );
      }
    };

    /**
     * Ajusta el tamaño al cambiar dimensiones de la ventana
     */
    const onResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    // Iniciar AR
    initAR();

    // Cleanup: liberar recursos al desmontar
    return () => {
      window.removeEventListener("resize", onResize);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Detener stream de cámara
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      // Usar variables locales guardadas al inicio del effect
      if (video && video.srcObject) {
        video.srcObject = null;
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      const renderer = rendererRef.current;
      if (
        container &&
        renderer?.domElement &&
        container.contains(renderer.domElement)
      ) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [poi, userLocation]);

  /**
   * Crea una textura de Canvas con la información del POI
   * @param {Object} poi - Punto de interés
   * @param {number} distancia - Distancia en km
   * @param {Object} THREE - Librería Three.js
   * @returns {THREE.CanvasTexture} Textura generada
   */
  function createInfoCard(poi, distancia, THREE) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Fondo con gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, "rgba(33, 150, 243, 0.95)");
    gradient.addColorStop(1, "rgba(25, 118, 210, 0.95)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);

    // Borde decorativo
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 1004, 492);

    // Nombre del POI
    ctx.fillStyle = "white";
    ctx.font = "bold 56px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(poi.nombre, 512, 120);

    // Línea separadora
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(150, 170);
    ctx.lineTo(874, 170);
    ctx.stroke();

    // Distancia
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "36px Arial, sans-serif";
    ctx.fillText(`📍 ${Math.round(distancia * 1000)} metros`, 512, 260);

    // Descripción
    const descripcion = poi.descripcion
      ? poi.descripcion.substring(0, 60) + "..."
      : "Explora este punto de interés";
    ctx.font = "28px Arial, sans-serif";
    ctx.fillText(descripcion, 512, 330);

    // Instrucción
    ctx.font = "italic 24px Arial, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText("Mueve tu dispositivo para explorar", 512, 420);

    return new THREE.CanvasTexture(canvas);
  }

  // Mostrar error si hay
  if (error) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "rgba(0,0,0,0.9)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          p: 3,
        }}
      >
        <Paper
          sx={{
            p: 3,
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            Error al iniciar AR
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              bgcolor: "#1976d2",
              color: "white",
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        bgcolor: "#000",
        overflow: "hidden",
      }}
    >
      {/* Video de la cámara como fondo */}
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
          zIndex: 1,
        }}
      />

      {/* Canvas 3D de Three.js encima del video */}
      <Box
        ref={containerRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          "& > canvas": {
            display: "block",
          },
        }}
      />

      {/* Botón de cerrar */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 10,
          bgcolor: "rgba(255,255,255,0.9)",
          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Indicador de carga */}
      {!isARReady && !error && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            zIndex: 10,
            bgcolor: "rgba(0,0,0,0.7)",
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Iniciando Realidad Aumentada...
          </Typography>
          <Typography variant="body2">Permitir acceso a la cámara</Typography>
        </Box>
      )}

      {/* Instrucciones de uso */}
      {isARReady && (
        <Paper
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            p: 2,
            bgcolor: "rgba(33, 150, 243, 0.9)",
            color: "white",
            maxWidth: "90%",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            📍 {poi.nombre}
          </Typography>
          <Typography variant="caption">
            Observa la tarjeta flotante con información
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
