"use client";
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const CircularProgressIndicator = ({ percentage = 0 }) => {
  const progresoRedondeado = Math.round(percentage);

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={progresoRedondeado}
        size={48}
        thickness={4}
        sx={{
          color:
            progresoRedondeado >= 70
              ? "#4CAF50"
              : progresoRedondeado >= 40
                ? "#FFA726"
                : "#90A4AE",
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ fontWeight: 600, fontSize: 11 }}
        >
          {progresoRedondeado}%
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressIndicator;
