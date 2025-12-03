"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { fetchCircuitos } from "../store/circuitos/circuitosSlice";
import CardCircuitos from "../components/circuitos/CardCircuitos";

const CircuitosView = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { circuitos, loading, error } = useSelector((state) => state.circuitos);

  useEffect(() => {
    dispatch(fetchCircuitos());
  }, [dispatch]);

  const handleCircuitoClick = (circuitoId) => {
    router.push(`/circuito/${circuitoId}`);
  };

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
            <CardCircuitos circuito={circuito} onClick={handleCircuitoClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CircuitosView;
