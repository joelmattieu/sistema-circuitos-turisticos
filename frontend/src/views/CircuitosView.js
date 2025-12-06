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
    <Box sx={{ width: "100%" }}>
      {" "}
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "600", fontSize: 14 }}>
        RECOMENDADOS
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        {circuitos.map((circuito) => (
          <Box key={circuito.circuito_id} sx={{ width: "100%" }}>
            <CardCircuitos circuito={circuito} onClick={handleCircuitoClick} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CircuitosView;
