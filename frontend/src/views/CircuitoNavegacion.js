"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchCircuitoById,
  finalizarCircuito,
} from "@/store/circuitos/circuitosSlice";
import { fetchPreferenciasByUsuario } from "@/store/preferencias/preferenciasSlice";
import NavigationPanel from "@/components/circuitos/NavigationPanel";
import { toast } from "react-toastify";
import { useDemoLocation } from "@/hooks/useDemoLocation";
import { registrarVisita } from "@/services/recorridos";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const MapView = dynamic(() => import("@/components/circuitos/MapView"), {
  loading: () => (
    <Box sx={{ width: "100%", height: "100%", background: "#f5f5f5" }} />
  ),
  ssr: false,
});

const ARView = dynamic(() => import("@/components/circuitos/ARView"), {
  ssr: false,
});

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

export default function CircuitoNavegacion({ circuitoId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const {
    location: realLocation,
    error: geoError,
    isLoading: geoLoading,
  } = useGeolocation();

  const [poiActualIndice, setPoiActualIndice] = useState(0);
  const [poiVisitados, setPoiVisitados] = useState(new Set());
  const [proximoPOI, setProximoPOI] = useState(null);
  const [mostrarAR, setMostrarAR] = useState(false);

  const { currentCircuito, loading: circuitoLoading } = useSelector(
    (state) => state.circuitos,
  );
  const { preferencias } = useSelector((state) => state.preferencias);

  const {
    demoEnabled,
    currentLocation: demoLocation,
    currentPoiIndex: demoPoiIndex,
    proximityLevel,
    distancia,
    progreso,
    pasoActual,
    proximoPOI: demoProximoPOI,
    avanzar,
    retroceder,
    toggleDemo,
    rutaCompleta,
  } = useDemoLocation(currentCircuito?.puntos_interes, realLocation);

  const userLocation = demoEnabled ? demoLocation : realLocation;
  const isLoading = demoEnabled ? false : geoLoading;

  useEffect(() => {
    if (circuitoId && user?.usuario_id) {
      dispatch(
        fetchCircuitoById({ id: circuitoId, usuarioId: user.usuario_id }),
      );
      dispatch(fetchPreferenciasByUsuario(user.usuario_id));
    } else if (circuitoId) {
      dispatch(fetchCircuitoById({ id: circuitoId }));
    }
  }, [dispatch, circuitoId, user?.usuario_id]);

  const prevLocationRef = useRef(null);

  useEffect(() => {
    if (!currentCircuito?.puntos_interes || !userLocation) {
      return;
    }

    const pois = currentCircuito.puntos_interes;

    const poisCercanos = pois
      .map((poi, idx) => {
        const distancia = calcularDistancia(
          userLocation.latitude,
          userLocation.longitude,
          poi.latitud,
          poi.longitud,
        );
        return { poi, indice: idx, distancia };
      })
      .sort((a, b) => a.distancia - b.distancia);

    if (poisCercanos[0] && poisCercanos[0].distancia < 0.05) {
      const indiceProximo = poisCercanos[0].indice;

      if (
        indiceProximo <= poiActualIndice + 1 &&
        !poiVisitados.has(indiceProximo)
      ) {
        queueMicrotask(() => {
          setPoiVisitados((prev) => {
            const newSet = new Set(prev);
            newSet.add(indiceProximo);
            return newSet;
          });

          if (user?.usuario_id) {
            const poiId = pois[indiceProximo].poi_id;
            registrarVisita(user.usuario_id, circuitoId, poiId)
              .then((resultado) => {
                const progreso = resultado?.progreso ?? 0;
                console.log(`POI visitado. Progreso: ${Math.round(progreso)}%`);

                if (progreso >= 100) {
                  setMostrarModalExito(true);
                }
              })
              .catch((error) => {
                console.error("Error registrando visita:", error);
              });
          }

          if (
            indiceProximo === poiActualIndice &&
            indiceProximo < pois.length - 1
          ) {
            setPoiActualIndice(indiceProximo + 1);
          }
        });
      }
    }

    const proximoIndice = Array.from({ length: pois.length }).findIndex(
      (_, idx) => !poiVisitados.has(idx),
    );

    if (proximoIndice >= 0 && proximoIndice < pois.length) {
      const nuevoPOI = pois[proximoIndice];
      if (!proximoPOI || proximoPOI.poi_id !== nuevoPOI.poi_id) {
        queueMicrotask(() => {
          setProximoPOI(nuevoPOI);
        });
      }
    }

    prevLocationRef.current = userLocation;
  }, [
    userLocation,
    currentCircuito?.puntos_interes,
    poiActualIndice,
    poiVisitados,
    proximoPOI,
  ]);

  useEffect(() => {
    if (!currentCircuito?.puntos_interes) {
      return;
    }

    const pois = currentCircuito.puntos_interes;
    const proximoIndice = Array.from({ length: pois.length }).findIndex(
      (_, idx) => !poiVisitados.has(idx),
    );

    if (proximoIndice >= 0 && proximoIndice < pois.length) {
      queueMicrotask(() => {
        setProximoPOI(pois[proximoIndice]);
      });
    }
  }, [poiVisitados, currentCircuito?.puntos_interes]);

  const handleARButtonClick = useCallback(() => {
    if (!proximoPOI) {
      toast.error("POI no disponible");
      return;
    }
    setMostrarAR(true);
  }, [proximoPOI]);

  useEffect(() => {
    if (geoError) {
      toast.error(
        "No se pudo obtener tu ubicación. Verifica los permisos del navegador.",
      );
    }
  }, [geoError]);

  if (circuitoLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#FAFAFA",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!currentCircuito) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#FAFAFA",
          p: 3,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="error">
            Circuito no encontrado
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/")}
            sx={{ mt: 2 }}
          >
            Volver al inicio
          </Button>
        </Box>
      </Box>
    );
  }

  const proximoPOIFinal =
    demoEnabled && demoProximoPOI ? demoProximoPOI : proximoPOI;

  const handleCerrarModal = () => {
    setMostrarModalExito(false);
  };

  const handleVolverInicio = () => {
    setMostrarModalExito(false);
    router.push("/");
  };

  return (
    <>
      <Dialog
        open={mostrarModalExito}
        onClose={handleCerrarModal}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            mx: 2,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pt: 3, pb: 1 }}>
          <CheckCircleIcon
            sx={{
              fontSize: 56,
              color: "#4CAF50",
              mb: 1,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: 1.3,
            }}
          >
            ¡Circuito Completado!
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", pb: 1.5, px: 3 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "13px" }}
          >
            ¡Felicitaciones! Has completado todos los puntos de interés de este
            circuito.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 2.5,
            px: 2,
            gap: 1.5,
            flexDirection: "column",
          }}
        >
          <Button
            onClick={handleVolverInicio}
            variant="contained"
            fullWidth
            sx={{
              py: 1.2,
              fontSize: "14px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Volver al inicio
          </Button>
          <Button
            onClick={handleCerrarModal}
            variant="text"
            fullWidth
            sx={{
              py: 1,
              fontSize: "13px",
              textTransform: "none",
              color: "text.secondary",
            }}
          >
            Continuar aquí
          </Button>
        </DialogActions>
      </Dialog>

      {mostrarAR && proximoPOIFinal && userLocation && (
        <ARView
          poi={proximoPOIFinal}
          userLocation={userLocation}
          demoMode={demoEnabled}
          onClose={() => setMostrarAR(false)}
        />
      )}

      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#FAFAFA",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 70,
            right: 10,
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            maxWidth: 140,
          }}
        >
          <Button
            variant="contained"
            onClick={toggleDemo}
            size="small"
            sx={{
              bgcolor: demoEnabled ? "#4caf50" : "#757575",
              color: "white",
              fontWeight: 600,
              fontSize: "0.7rem",
              py: 0.5,
              px: 1,
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              "&:hover": {
                bgcolor: demoEnabled ? "#45a049" : "#616161",
              },
            }}
            startIcon={
              demoEnabled ? (
                <PauseIcon sx={{ fontSize: 14 }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: 14 }} />
              )
            }
          >
            {demoEnabled ? "Demo" : "Demo"}
          </Button>

          {demoEnabled && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0.3,
                bgcolor: "white",
                p: 0.5,
                borderRadius: 1,
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={retroceder}
                sx={{ minWidth: 0, p: 0.3, fontSize: "0.65rem" }}
              >
                ←
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={avanzar}
                sx={{
                  minWidth: 0,
                  p: 0.3,
                  fontSize: "0.65rem",
                  bgcolor: "#2196f3",
                }}
              >
                →
              </Button>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #FAFAFA",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {currentCircuito.nombre}
          </Typography>
          <Typography variant="caption" sx={{ color: "#999" }}>
            ({poiActualIndice + 1} de {currentCircuito.puntos_interes.length})
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "50vh",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <MapView
            circuito={currentCircuito}
            userLocation={userLocation}
            proximoPOI={proximoPOIFinal}
            isLoading={isLoading}
            rutaCompleta={rutaCompleta}
          />
        </Box>

        {proximoPOIFinal && currentCircuito.puntos_interes && (
          <Box>
            <NavigationPanel
              userLocation={userLocation}
              proximoPOI={proximoPOIFinal}
              circuito={currentCircuito}
              poiActualIndice={poiActualIndice}
              modoTransporte={preferencias?.modo_transporte || "a_pie"}
              onARButtonClick={handleARButtonClick}
              pasoActual={pasoActual}
            />
          </Box>
        )}
      </Box>
    </>
  );
}
