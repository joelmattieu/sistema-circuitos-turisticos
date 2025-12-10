"use client";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  DirectionsWalk,
  DirectionsCar,
  DirectionsBike,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { LanguageContext } from "@/context/LanguageContext";
import { fetchIdiomas } from "@/store/idiomas/idiomasSlice";
import { fetchModosTransporte } from "@/store/modosTransporte/modosTransporteSlice";
import { fetchUnidadesMedicion } from "@/store/unidadesMedicion/unidadesMedicionSlice";
import {
  fetchPreferenciasByUsuario,
  updatePreferencias,
} from "@/store/preferencias/preferenciasSlice";

export default function PreferenciasView() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { t, changeLanguage } = useContext(LanguageContext);

  const { idiomas, loading: idiomasLoading } = useSelector(
    (state) => state.idiomas
  );
  const { modos, loading: modosLoading } = useSelector(
    (state) => state.modosTransporte
  );
  const { unidades, loading: unidadesLoading } = useSelector(
    (state) => state.unidadesMedicion
  );
  const { preferencias, loading: preferenciasLoading } = useSelector(
    (state) => state.preferencias
  );

  const [preferenciasState, setPreferenciasState] = useState({
    idioma_id: null,
    modo_transporte_id: null,
    unidad_medicion_id: null,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    dispatch(fetchIdiomas());
    dispatch(fetchModosTransporte());
    dispatch(fetchUnidadesMedicion());
  }, [dispatch]);

  useEffect(() => {
    if (user?.usuario_id) {
      dispatch(fetchPreferenciasByUsuario(user.usuario_id));
    }
  }, [user?.usuario_id, dispatch]);

  // Inicializar estado local con preferencias del usuario
  useEffect(() => {
    if (preferencias && !isInitialized) {
      setTimeout(() => {
        setPreferenciasState({
          idioma_id: preferencias.idioma_id,
          modo_transporte_id: preferencias.modo_transporte_id,
          unidad_medicion_id: preferencias.unidad_medicion_id,
        });
        setIsInitialized(true);
      }, 0);
    }
  }, [preferencias, isInitialized]);

  const guardarPreferencias = (nuevasPreferencias) => {
    if (
      !nuevasPreferencias.idioma_id ||
      !nuevasPreferencias.modo_transporte_id ||
      !nuevasPreferencias.unidad_medicion_id
    ) {
      return;
    }

    dispatch(
      updatePreferencias({
        usuario_id: user.usuario_id,
        ...nuevasPreferencias,
      })
    )
      .unwrap()
      .then(() => {})
      .catch((error) => {
        toast.error(t("preferences.error"));
        console.error(error);
      });
  };

  const handleIdiomaChange = (e) => {
    const idiomaId = e.target.value;
    const nuevasPreferencias = {
      ...preferenciasState,
      idioma_id: idiomaId,
    };

    setPreferenciasState(nuevasPreferencias);

    // Cambia idioma inmediatamente en la UI
    const idioma = idiomas.find((i) => i.idioma_id === idiomaId);
    if (idioma) {
      changeLanguage(idioma.codigo_iso);
    }

    if (isInitialized) {
      guardarPreferencias(nuevasPreferencias);
    }
  };

  const handleModoTransporteChange = (e, newValue) => {
    if (newValue) {
      const nuevasPreferencias = {
        ...preferenciasState,
        modo_transporte_id: newValue,
      };

      setPreferenciasState(nuevasPreferencias);

      if (isInitialized) {
        guardarPreferencias(nuevasPreferencias);
      }
    }
  };

  const handleUnidadMedicionChange = (e) => {
    const nuevasPreferencias = {
      ...preferenciasState,
      unidad_medicion_id: e.target.value,
    };

    setPreferenciasState(nuevasPreferencias);

    if (isInitialized) {
      guardarPreferencias(nuevasPreferencias);
    }
  };

  const isLoading =
    idiomasLoading || modosLoading || unidadesLoading || preferenciasLoading;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 5,
          fontSize: "24px",
        }}
      >
        {t("preferences.title")}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 5,
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "15px",
            mb: 2,
            color: "#212121",
          }}
        >
          {t("preferences.language")}
        </Typography>
        <FormControl fullWidth>
          <Select
            value={preferenciasState.idioma_id || ""}
            onChange={handleIdiomaChange}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 1.5,
              height: 40,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E0E0E0",
              },
              fontSize: "14px",
            }}
          >
            {idiomas.map((idioma) => (
              <MenuItem key={idioma.idioma_id} value={idioma.idioma_id}>
                {idioma.nombre_idioma}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* MODO DE TRANSPORTE */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 5,
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "15px",
            mb: 2,
            color: "#212121",
          }}
        >
          {t("preferences.transport")}
        </Typography>
        <ToggleButtonGroup
          value={preferenciasState.modo_transporte_id}
          exclusive
          onChange={handleModoTransporteChange}
          fullWidth
          sx={{
            display: "flex",
            gap: 1,
            "& .MuiToggleButtonGroup-grouped": {
              border: 0,
              borderRadius: "8px !important",
              flex: 1,
              margin: 0,
            },
            "& .MuiToggleButton-root": {
              fontSize: "13px",
              fontWeight: 600,
              py: 1.5,
              px: 1,
              border: "2px solid #E0E0E0",
              borderRadius: "8px",
              color: "#666",
              textTransform: "none",
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              alignItems: "center",
              backgroundColor: "#fff",
              "&.Mui-selected": {
                backgroundColor: "#FF9800",
                color: "#fff",
                borderColor: "#FF9800",
                "&:hover": {
                  backgroundColor: "#F57C00",
                },
              },
              "&:hover": {
                backgroundColor: "#FAFAFA",
                borderColor: "#C0C0C0",
              },
            },
          }}
        >
          {modos.map((modo) => {
            let icon = null;
            let shortLabel = modo.nombre_modo_transporte;

            if (modo.nombre_modo_transporte?.toLowerCase().includes("pie")) {
              icon = <DirectionsWalk sx={{ fontSize: "20px" }} />;
              shortLabel = "A pie";
            } else if (
              modo.nombre_modo_transporte?.toLowerCase().includes("bicicleta")
            ) {
              icon = <DirectionsBike sx={{ fontSize: "20px" }} />;
              shortLabel = "Bici";
            } else if (
              modo.nombre_modo_transporte
                ?.toLowerCase()
                .includes("automóvil") ||
              modo.nombre_modo_transporte?.toLowerCase().includes("auto")
            ) {
              icon = <DirectionsCar sx={{ fontSize: "20px" }} />;
              shortLabel = "Auto";
            }

            return (
              <ToggleButton
                key={modo.modo_transporte_id}
                value={modo.modo_transporte_id}
              >
                {icon}
                {shortLabel}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 5,
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "15px",
            mb: 2,
            color: "#212121",
          }}
        >
          {t("preferences.unit")}
        </Typography>
        <RadioGroup
          value={preferenciasState.unidad_medicion_id || ""}
          onChange={handleUnidadMedicionChange}
        >
          {unidades.map((unidad) => (
            <FormControlLabel
              key={unidad.unidad_medicion_id}
              value={unidad.unidad_medicion_id}
              control={
                <Radio
                  sx={{
                    color: "#FF9800",
                    "&.Mui-checked": {
                      color: "#FF9800",
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                  {unidad.nombre_unidad_medicion}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </Paper>
    </Container>
  );
}
