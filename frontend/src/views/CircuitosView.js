"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import { fetchCircuitos } from "../store/circuitos/circuitosSlice";

const CircuitosView = () => {
  const dispatch = useDispatch();
  const { circuitos, loading, error } = useSelector((state) => state.circuitos);

  useEffect(() => {
    dispatch(fetchCircuitos());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        RECOMENDADOS
      </Typography>

      <Grid container spacing={2}>
        {circuitos.map((circuito) => (
          <Grid item xs={12} md={6} key={circuito.circuito_id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{circuito.nombre}</Typography>
                <Typography color="text.secondary">
                  {circuito.descripcion}
                </Typography>
                <Typography variant="body2" mt={1}>
                  {(circuito.distancia_total_metros / 1000).toFixed(1)} km •{" "}
                  {circuito.duracion_estimada_minutos} min
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CircuitosView;
