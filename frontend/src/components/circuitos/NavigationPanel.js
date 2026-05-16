"use client";

import { useMemo, useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import StraightIcon from "@mui/icons-material/Straight";
import NorthIcon from "@mui/icons-material/North";
import { estimarDuracion, calcularDistanciaMetros } from "@/utils/geo";
import { useDistanceFormatter } from "@/hooks/useDistance";
import { LanguageContext } from "@/context/LanguageContext";
import { obtenerClaveInstruccion } from "@/utils/routing";

const ICONO_NAVEGACION = { fontSize: 28, color: "#1976d2" };
const DISTANCIA_LLEGADA_METROS = 50;

// Mapea códigos de instrucción de OpenRouteService al ícono visual.
// Los códigos (0=recto, 1=derecha, 2=izquierda, etc.) vienen de la API.
const ICONOS_POR_TIPO_INSTRUCCION = {
  0: StraightIcon,
  1: TurnRightIcon,
  2: TurnLeftIcon,
  3: TurnRightIcon,
  4: TurnLeftIcon,
  5: TurnRightIcon,
  6: TurnLeftIcon,
  7: StraightIcon,
  10: NorthIcon,
  11: NorthIcon,
  12: LocationOnIcon,
};

function IconoInstruccion({ tipo }) {
  const Icono = ICONOS_POR_TIPO_INSTRUCCION[tipo] || StraightIcon;
  return <Icono sx={ICONO_NAVEGACION} />;
}

export default function NavigationPanel({
  userLocation,
  proximoPOI,
  modoTransporte = "a_pie",
  onARButtonClick,
  pasoActual,
}) {
  const { formatDistance } = useDistanceFormatter();
  const { t } = useContext(LanguageContext);

  const infoProximoPOI = useMemo(() => {
    if (!userLocation || !proximoPOI) {
      return null;
    }

    const distanciaMetros = calcularDistanciaMetros(
      userLocation.latitude,
      userLocation.longitude,
      proximoPOI.latitud,
      proximoPOI.longitud,
    );

    return {
      distanciaMetros,
      minutos: estimarDuracion(distanciaMetros, modoTransporte),
      estaProximo: distanciaMetros < DISTANCIA_LLEGADA_METROS,
      distanciaDisplay: formatDistance(distanciaMetros, true),
    };
  }, [userLocation, proximoPOI, modoTransporte, formatDistance]);

  if (!infoProximoPOI || !proximoPOI) {
    return null;
  }

  const { estaProximo, distanciaDisplay, minutos } = infoProximoPOI;

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
            {t("nav.arrivedAt", { name: proximoPOI.nombre })}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            mb: 2,
            fontSize: "0.875rem",
          }}
        >
          {t("nav.exploreInAR")}
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
          {t("nav.openInAR")}
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
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          mb: 1.5,
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            mt: 0.25,
          }}
        >
          {pasoActual ? (
            <IconoInstruccion tipo={pasoActual.tipo} />
          ) : (
            <NorthIcon sx={ICONO_NAVEGACION} />
          )}
        </Box>

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
            ? t(obtenerClaveInstruccion(pasoActual.tipo), {
                dist: formatDistance(pasoActual.distancia, true),
                street: pasoActual.nombreCalle || t("routing.defaultStreet"),
              })
            : `${distanciaDisplay}`}
        </Typography>
      </Box>

      <Box
        sx={{
          height: "1px",
          bgcolor: "#e0e0e0",
          mb: 1.5,
        }}
      />

      <Typography
        variant="body2"
        sx={{
          color: "#666",
          fontSize: "0.875rem",
          lineHeight: 1.5,
        }}
      >
        {t("nav.nextDestination", {
          name: proximoPOI.nombre,
          distance: distanciaDisplay,
          minutes: minutos,
        })}
      </Typography>
    </Box>
  );
}
