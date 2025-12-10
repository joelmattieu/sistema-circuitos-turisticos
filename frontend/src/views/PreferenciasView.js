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
  Button,
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
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    if (preferencias) {
      setTimeout(() => {
        setPreferenciasState({
          idioma_id: preferencias.idioma_id,
          modo_transporte_id: preferencias.modo_transporte_id,
          unidad_medicion_id: preferencias.unidad_medicion_id,
        });
      }, 0);
    }
  }, [preferencias]);

  const handleIdiomaChange = (e) => {
    const idiomaId = e.target.value;
    setPreferenciasState({
      ...preferenciasState,
      idioma_id: idiomaId,
    });

    // Cambia idioma inmediatamente en la UI
    const idioma = idiomas.find((i) => i.idioma_id === idiomaId);
    if (idioma) {
      changeLanguage(idioma.codigo_iso);
    }
  };

  const handleModoTransporteChange = (e, newValue) => {
    if (newValue) {
      setPreferenciasState({
        ...preferenciasState,
        modo_transporte_id: newValue,
      });
    }
  };

  const handleUnidadMedicionChange = (e) => {
    setPreferenciasState({
      ...preferenciasState,
      unidad_medicion_id: e.target.value,
    });
  };

  const handleGuardar = async () => {
    if (
      !preferenciasState.idioma_id ||
      !preferenciasState.modo_transporte_id ||
      !preferenciasState.unidad_medicion_id
    ) {
      toast.warning(t("preferences.warning"));
      return;
    }

    dispatch(
      updatePreferencias({
        usuario_id: user.usuario_id,
        ...preferenciasState,
      })
    )
      .unwrap()
      .then(() => {
        toast.success(t("preferences.success"));
      })
      .catch((error) => {
        toast.error(t("preferences.error"));
        console.error(error);
      });
  };

  const isLoading =
    loading ||
    idiomasLoading ||
    modosLoading ||
    unidadesLoading ||
    preferenciasLoading;

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
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
          fontSize: "28px",
        }}
      >
        {t("preferences.title")}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          backgroundColor: "#F5F5F5",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            mb: 2,
            color: "#000",
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

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          backgroundColor: "#F5F5F5",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            mb: 2,
            color: "#000",
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
            "& .MuiToggleButton-root": {
              fontSize: "13px",
              fontWeight: 600,
              py: 1.5,
              borderRadius: 1,
              border: "2px solid #E0E0E0",
              color: "#666",
              textTransform: "none",
              display: "flex",
              gap: 0.5,
              alignItems: "center",
              "&.Mui-selected": {
                backgroundColor: "#FF9800",
                color: "#fff",
                borderColor: "#FF9800",
              },
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          {modos.map((modo) => {
            let icon = null;
            if (modo.nombre_modo_transporte?.toLowerCase().includes("pie"))
              icon = <DirectionsWalk sx={{ fontSize: "18px" }} />;
            else if (
              modo.nombre_modo_transporte?.toLowerCase().includes("bicicleta")
            )
              icon = <DirectionsBike sx={{ fontSize: "18px" }} />;
            else if (
              modo.nombre_modo_transporte
                ?.toLowerCase()
                .includes("automóvil") ||
              modo.nombre_modo_transporte?.toLowerCase().includes("auto")
            )
              icon = <DirectionsCar sx={{ fontSize: "18px" }} />;

            return (
              <ToggleButton
                key={modo.modo_transporte_id}
                value={modo.modo_transporte_id}
              >
                {icon && icon}
                {modo.nombre_modo_transporte}
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
          borderRadius: 2,
          backgroundColor: "#F5F5F5",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            mb: 2,
            color: "#000",
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

      <Button
        variant="contained"
        fullWidth
        onClick={handleGuardar}
        disabled={saving}
        sx={{
          backgroundColor: "#FF9800",
          color: "#fff",
          fontWeight: 700,
          py: 1.5,
          fontSize: "14px",
          borderRadius: 1,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#F57C00",
          },
          "&:disabled": {
            backgroundColor: "#BDBDBD",
          },
        }}
      >
        {saving ? <CircularProgress size={24} /> : t("preferences.save")}
      </Button>
    </Container>
  );
}
