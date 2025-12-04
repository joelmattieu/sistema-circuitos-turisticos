"use client";
import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import ProtectedRoutes from "@/security/ProtectedRoutes";
import AuthContext from "@/context/AuthContext";
import CircuitosView from "@/views/CircuitosView";

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext || {};

  return (
    <ProtectedRoutes>
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {user ? `Hola, ${user.nombre}` : "Buenos días"}
        </Typography>
        <CircuitosView />
      </Box>
    </ProtectedRoutes>
  );
}

export default HomePage;
