"use client";
import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import {
  Church as ChurchIcon,
  AccountBalance as AccountBalanceIcon,
  Museum as MuseumIcon,
  Landscape as LandscapeIcon,
  LocationOn as LocationIcon,
  Park as ParkIcon,
  Castle as MonumentIcon,
} from "@mui/icons-material";
import {
  fetchCircuitoById,
  finalizarCircuito,
} from "../store/circuitos/circuitosSlice";
import { fetchPreferenciasByUsuario } from "../store/preferencias/preferenciasSlice";
import { LanguageContext } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useDistanceFormatter } from "@/hooks/useDistance";

const getIconByTipo = (tipo) => {
  switch (tipo?.toLowerCase()) {
    case "religioso":
      return <ChurchIcon />;
    case "museo":
      return <MuseumIcon />;
    case "historico":
      return <AccountBalanceIcon />;
    case "natural":
      return <ParkIcon />;
    case "arquitectonico":
      return <LandscapeIcon />;
    case "monumento":
      return <MonumentIcon />;
    default:
      return <LocationIcon />;
  }
};

const CircuitoDetalle = ({ circuitoId }) => {
  const dispatch = useDispatch();
  const { t } = useContext(LanguageContext);
  const { user } = useAuth();
  const { formatDistance } = useDistanceFormatter();
  const { currentCircuito, loading, error } = useSelector(
    (state) => state.circuitos
  );
  const { preferencias } = useSelector((state) => state.preferencias);

  console.log("Preferencias del usuario:", preferencias);

  useEffect(() => {
    if (circuitoId && user?.usuario_id) {
      dispatch(
        fetchCircuitoById({ id: circuitoId, usuarioId: user.usuario_id })
      );
    } else if (circuitoId) {
      dispatch(fetchCircuitoById({ id: circuitoId }));
    }
  }, [dispatch, circuitoId, user?.usuario_id]);

  useEffect(() => {
    if (user?.usuario_id && !preferencias) {
      dispatch(fetchPreferenciasByUsuario(user.usuario_id));
    }
  }, [dispatch, user?.usuario_id, preferencias]);

  const handleComenzarCircuito = () => {
    dispatch(finalizarCircuito(circuitoId));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !currentCircuito) {
    return (
      <Box mt={4}>
        <Typography color="error">{t("circuit.error")}</Typography>
      </Box>
    );
  }

  const distanciaDisplay = formatDistance(
    currentCircuito.distancia_total_metros,
    currentCircuito.distancia_formateada,
    currentCircuito.unidad_medicion
  );

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Card sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
        <Box
          sx={{
            position: "relative",
            height: 200,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${currentCircuito.url_imagen_portada})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {t("circuit.title", { name: currentCircuito.nombre.toUpperCase() })}
          </Typography>
        </Box>
      </Card>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          fontSize: "14px",
          color: "#212121",
          lineHeight: 1.8,
          textAlign: "left",
        }}
      >
        {currentCircuito.descripcion}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          mb: 5,
          fontSize: "16px",
          fontWeight: "bold",
          lineHeight: 1.8,
          color: "#212121",
        }}
      >
        {distanciaDisplay} • {currentCircuito.duracion_estimada_minutos} min •{" "}
        {currentCircuito.puntos_interes?.length || 0} POIs
      </Typography>

      <Box sx={{ mb: 7, mt: 3, textAlign: "center" }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleComenzarCircuito}
          sx={{
            backgroundColor: "#FF9800",
            color: "white",
            fontWeight: "bold",
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontSize: "16px",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: "#F57C00",
            },
          }}
        >
          {t("circuit.start")}
        </Button>
      </Box>

      <Typography
        variant="h6"
        sx={{ fontWeight: "400", fontSize: "16px" }}
      >
        {t("circuit.pois")}
      </Typography>

      <List sx={{ mb: 3 }}>
        {currentCircuito.puntos_interes?.map((punto) => (
          <ListItem key={punto.poi_id} sx={{ pl: 0 }}>
            <ListItemIcon>{getIconByTipo(punto.tipo)}</ListItemIcon>
            <ListItemText
              primary={punto.nombre}
              secondary={punto.descripcion}
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "1rem",
              }}
              secondaryTypographyProps={{
                fontSize: "0.875rem",
                color: "text.secondary",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CircuitoDetalle;
