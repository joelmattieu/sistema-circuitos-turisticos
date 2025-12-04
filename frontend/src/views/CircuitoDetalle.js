"use client";
import React, { useEffect } from "react";
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
  AccountBalance as MuseumIcon,
  Landscape as LandscapeIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import {
  fetchCircuitoById,
  finalizarCircuito,
} from "../store/circuitos/circuitosSlice";

const CircuitoDetalle = ({ circuitoId }) => {
  const dispatch = useDispatch();
  const { currentCircuito, loading, error } = useSelector(
    (state) => state.circuitos
  );

  useEffect(() => {
    if (circuitoId) {
      dispatch(fetchCircuitoById(circuitoId));
    }
  }, [dispatch, circuitoId]);

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
        <Typography color="error">Error al cargar el circuito</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Card sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
        <Box
          sx={{
            position: "relative",
            height: 200,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${currentCircuito.url_imagen_portada})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            {currentCircuito.nombre.toUpperCase()}
          </Typography>
        </Box>
      </Card>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: "text.secondary",
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        {currentCircuito.descripcion}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        {(currentCircuito.distancia_total_metros / 1000).toFixed(1)} km •{" "}
        {currentCircuito.duracion_estimada_minutos} min •{" "}
        {currentCircuito.puntos_interes?.length || 3} POIs
      </Typography>

      <Box sx={{ mb: 4, textAlign: "center" }}>
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
            fontSize: "1.1rem",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: "#F57C00",
            },
          }}
        >
          Comenzar Circuito
        </Button>
      </Box>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        PUNTOS DE INTERÉS
      </Typography>

      <List sx={{ mb: 3 }}>
        <ListItem sx={{ pl: 0 }}>
          <ListItemIcon>
            <ChurchIcon />
          </ListItemIcon>
          <ListItemText
            primary="Catedral de Córdoba"
            secondary="Principal iglesia de la ciudad."
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

        <ListItem sx={{ pl: 0 }}>
          <ListItemIcon>
            <MuseumIcon />
          </ListItemIcon>
          <ListItemText
            primary="Cabildo Histórico"
            secondary="Antiguo edificio colonial, hoy museo."
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

        <ListItem sx={{ pl: 0 }}>
          <ListItemIcon>
            <LandscapeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Pasaje Santa Catalina"
            secondary="Conexión con la Plazoleta del Fundador."
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
      </List>
    </Box>
  );
};

export default CircuitoDetalle;
