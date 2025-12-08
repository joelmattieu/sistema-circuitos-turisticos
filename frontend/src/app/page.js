"use client";
import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import ProtectedRoutes from "@/security/ProtectedRoutes";
import AuthContext from "@/context/AuthContext";
import { LanguageContext } from "@/context/LanguageContext";
import CircuitosView from "@/views/CircuitosView";

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const { user } = authContext || {};

  return (
    <ProtectedRoutes>
      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: "500", fontSize: 20, mb: "7px", mt: 1 }}
        >
          {user
            ? t("home.welcome", { name: user.nombre })
            : t("home.welcomeGuest")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, fontSize: 16 }}>
          {t("home.chooseCircuit")}
        </Typography>
        <CircuitosView />
      </Box>
    </ProtectedRoutes>
  );
};

export default HomePage;
