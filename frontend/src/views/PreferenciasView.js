"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  DirectionsWalk,
  DirectionsCar,
  DirectionsBike,
} from "@mui/icons-material";
import { useAuth } from "@/hooks/useAuth";
import { fetchIdiomas } from "@/store/idiomas/idiomasSlice";
import { fetchModosTransporte } from "@/store/modosTransporte/modosTransporteSlice";
import { fetchUnidadesMedicion } from "@/store/unidadesMedicion/unidadesMedicionSlice";
import { preferenciasService } from "@/services/preferencias";
import { toast } from "react-toastify";

export default function PreferenciasView() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { idiomas, loading: idiomasLoading } = useSelector(
    (state) => state.idiomas
  );
  const { modos, loading: modosLoading } = useSelector(
    (state) => state.modosTransporte
  );
  const { unidades, loading: unidadesLoading } = useSelector(
    (state) => state.unidadesMedicion
  );

  const [preferencias, setPreferencias] = useState({
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
      loadPreferencias();
    }
  }, [user]);

  const loadPreferencias = async () => {
    try {
      setLoading(true);
      const data = await preferenciasService.getByUsuarioId(user.usuario_id);
      if (data) {
        setPreferencias({
          idioma_id: data.idioma_id,
          modo_transporte_id: data.modo_transporte_id,
          unidad_medicion_id: data.unidad_medicion_id,
        });
      }
    } catch (error) {
      console.error("Error al cargar preferencias:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIdiomaChange = (e) => {
    setPreferencias({
      ...preferencias,
      idioma_id: e.target.value,
    });
  };

  const handleModoTransporteChange = (e, newValue) => {
    if (newValue) {
      setPreferencias({
        ...preferencias,
        modo_transporte_id: newValue,
      });
    }
  };

  const handleUnidadMedicionChange = (e) => {
    setPreferencias({
      ...preferencias,
      unidad_medicion_id: e.target.value,
    });
  };

  const handleGuardar = async () => {
    if (
      !preferencias.idioma_id ||
      !preferencias.modo_transporte_id ||
      !preferencias.unidad_medicion_id
    ) {
      toast.warning("Por favor completa todas las preferencias");
      return;
    }

    try {
      setSaving(true);
      await preferenciasService.createOrUpdate({
        usuario_id: user.usuario_id,
        idioma_id: preferencias.idioma_id,
        modo_transporte_id: preferencias.modo_transporte_id,
        unidad_medicion_id: preferencias.unidad_medicion_id,
      });
      toast.success("Preferencias guardadas correctamente");
    } catch (error) {
      toast.error("Error al guardar preferencias");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const isLoading =
    loading || idiomasLoading || modosLoading || unidadesLoading;

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
        Preferencias
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
          IDIOMA
        </Typography>
        <FormControl fullWidth>
          <Select
            value={preferencias.idioma_id || ""}
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
                {idioma.nombre}
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
          MODO DE TRANSPORTE
        </Typography>
        <ToggleButtonGroup
          value={preferencias.modo_transporte_id}
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
            if (modo.nombre?.toLowerCase().includes("pie"))
              icon = <DirectionsWalk sx={{ fontSize: "18px" }} />;
            else if (modo.nombre?.toLowerCase().includes("auto"))
              icon = <DirectionsCar sx={{ fontSize: "18px" }} />;
            else if (modo.nombre?.toLowerCase().includes("bici"))
              icon = <DirectionsBike sx={{ fontSize: "18px" }} />;

            return (
              <ToggleButton
                key={modo.modo_transporte_id}
                value={modo.modo_transporte_id}
              >
                {icon && icon}
                {modo.nombre}
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
          UNIDAD DE MEDICIÓN
        </Typography>
        <RadioGroup
          value={preferencias.unidad_medicion_id || ""}
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
                  {unidad.nombre}
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
        {saving ? <CircularProgress size={24} /> : "Guardar Preferencias"}
      </Button>
    </Container>
  );
}
