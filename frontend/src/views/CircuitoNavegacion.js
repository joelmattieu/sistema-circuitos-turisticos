"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
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
import { calcularDistanciaMetros } from "@/utils/geo";
import { useAuth } from "@/hooks/useAuth";
import { fetchCircuitoById, finalizarCircuito } from "@/store/circuitos/circuitosSlice";
import { fetchPreferencias } from "@/store/preferencias/preferenciasSlice";
import NavigationPanel from "@/components/circuitos/NavigationPanel";
import { toast } from "react-toastify";
import { useDemoLocation } from "@/hooks/useDemoLocation";
import { LanguageContext } from "@/context/LanguageContext";
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


export default function CircuitoNavegacion({ circuitoId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { t, language } = useContext(LanguageContext);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [circuitoCompletable, setCircuitoCompletable] = useState(false);
  const [yaFinalizado, setYaFinalizado] = useState(false);

  const handleFinalizarCircuito = () => {
    if (!yaFinalizado) {
      dispatch(finalizarCircuito(circuitoId));
      setYaFinalizado(true);
    }
    setMostrarModalExito(true);
  };
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
    pasoActual,
    proximoPOI: demoProximoPOI,
    avanzar,
    retroceder,
    toggleDemo,
    rutaCompleta,
  } = useDemoLocation(currentCircuito?.puntos_interes, realLocation, null, language);

  const userLocation = demoEnabled ? demoLocation : realLocation;
  const isLoading = demoEnabled ? false : geoLoading;

  useEffect(() => {
    if (circuitoId) {
      dispatch(fetchCircuitoById(circuitoId));
      if (user) {
        dispatch(fetchPreferencias());
      }
    }
  }, [dispatch, circuitoId, user]);

  useEffect(() => {
    if (!currentCircuito?.puntos_interes || !userLocation) {
      return;
    }

    const pois = currentCircuito.puntos_interes;

    const poisCercanos = pois
      .map((poi, idx) => {
        const distancia = calcularDistanciaMetros(
          userLocation.latitude,
          userLocation.longitude,
          poi.latitud,
          poi.longitud,
        );
        return { poi, indice: idx, distancia };
      })
      .sort((a, b) => a.distancia - b.distancia);

    if (poisCercanos[0] && poisCercanos[0].distancia < 50) {
      const indiceProximo = poisCercanos[0].indice;

      if (
        indiceProximo <= poiActualIndice + 1 &&
        !poiVisitados.has(indiceProximo)
      ) {
        if (user) {
          const poiId = pois[indiceProximo].poi_id;
          registrarVisita(circuitoId, poiId)
            .then((resultado) => {
              const progreso = resultado?.progreso ?? 0;
              if (progreso >= 100) {
                setCircuitoCompletable(true);
              }
            })
            .catch((error) => {
              console.error("Error registrando visita:", error);
            });
        }

        queueMicrotask(() => {
          setPoiVisitados((prev) => {
            const newSet = new Set(prev);
            newSet.add(indiceProximo);
            return newSet;
          });
          if (indiceProximo === poiActualIndice && indiceProximo < pois.length - 1) {
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
        queueMicrotask(() => setProximoPOI(nuevoPOI));
      }
    }
  }, [
    userLocation,
    currentCircuito?.puntos_interes,
    poiActualIndice,
    poiVisitados,
    proximoPOI,
    circuitoId,
    user?.usuario_id,
    user
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
      toast.error(t("nav.poiUnavailable"));
      return;
    }
    setMostrarAR(true);
  }, [proximoPOI, t]);

  useEffect(() => {
    if (geoError) {
      toast.error(t("nav.noLocation"));
    }
  }, [geoError, t]);

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
            {t("nav.notFound")}
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/")}
            sx={{ mt: 2 }}
          >
            {t("nav.backHome")}
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
            {t("nav.completed")}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", pb: 1.5, px: 3 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "13px" }}
          >
            {t("nav.completedMessage")}
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
            {t("nav.backHome")}
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
            {t("nav.stayHere")}
          </Button>
        </DialogActions>
      </Dialog>

      {mostrarAR && proximoPOIFinal && userLocation && (
        <ARView
          poi={proximoPOIFinal}
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
            {demoEnabled ? t("nav.demoStop") : t("nav.demoStart")}
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
            {t("nav.circuitTitle", { name: currentCircuito.nombre })}
          </Typography>
          <Typography variant="caption" sx={{ color: "#999" }}>
            {t("nav.poiCounter", {
              current: poiVisitados.size,
              total: currentCircuito.puntos_interes.length,
            })}
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

        {!userLocation && geoError && (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body2" color="error">
              {t("nav.noLocation")}
            </Typography>
          </Box>
        )}

        {circuitoCompletable && (
          <Box
            sx={{
              mx: 2,
              mt: 1.5,
              mb: 0.5,
              px: 2,
              py: 1.25,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
              bgcolor: "#E8F5E9",
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleIcon sx={{ fontSize: 20, color: "#2E7D32" }} />
              <Typography
                variant="body2"
                sx={{ color: "#2E7D32", fontWeight: 600 }}
              >
                {t("nav.readyToFinish")}
              </Typography>
            </Box>
            <Button
              onClick={handleFinalizarCircuito}
              variant="outlined"
              size="small"
              sx={{
                color: "#2E7D32",
                borderColor: "#2E7D32",
                fontWeight: 600,
                textTransform: "none",
                px: 1.75,
                py: 0.5,
                borderRadius: 2,
                whiteSpace: "nowrap",
                "&:hover": {
                  borderColor: "#2E7D32",
                  bgcolor: "rgba(46,125,50,0.08)",
                },
              }}
            >
              {t("nav.finishCircuit")}
            </Button>
          </Box>
        )}

        {proximoPOIFinal && currentCircuito.puntos_interes && userLocation && (
          <Box>
            <NavigationPanel
              userLocation={userLocation}
              proximoPOI={proximoPOIFinal}
              modoTransporte={preferencias?.modo_transporte_id || "a_pie"}
              onARButtonClick={handleARButtonClick}
              pasoActual={pasoActual}
            />
          </Box>
        )}
      </Box>
    </>
  );
}
