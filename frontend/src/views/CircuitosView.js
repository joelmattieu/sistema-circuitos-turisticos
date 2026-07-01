"use client";
import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { fetchCircuitos } from "../store/circuitos/circuitosSlice";
import { fetchPreferencias } from "../store/preferencias/preferenciasSlice";
import CardCircuitos from "../components/circuitos/CardCircuitos";
import CircuitosRecomendados from "../components/circuitos/CircuitosRecomendados";
import { obtenerCircuitosRecomendados } from "../services/recomendaciones";
import { circuitosService } from "../services/circuitos";
import { LanguageContext } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useGeolocation } from "@/hooks/useGeolocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const MODO_NOMBRE_POR_ID = { 1: "A pie", 2: "Automóvil", 3: "Bicicleta" };

const CircuitosView = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useContext(LanguageContext);
  const { user } = useAuth();
  const { location } = useGeolocation();
  const latAprox = location?.latitude?.toFixed(3);
  const lonAprox = location?.longitude?.toFixed(3);
  const { circuitos, loading, error } = useSelector((state) => state.circuitos);
  const { preferencias } = useSelector((state) => state.preferencias);
  const [circuitosRecomendados, setCircuitosRecomendados] = useState([]);
  const [circuitosCercanos, setCircuitosCercanos] = useState([]);
  const [loadingRecomendaciones, setLoadingRecomendaciones] = useState(true);

  useEffect(() => {
    dispatch(fetchCircuitos());
  }, [dispatch, user?.usuario_id]);

  useEffect(() => {
    if (user && !preferencias) {
      dispatch(fetchPreferencias());
    }
  }, [dispatch, user, preferencias]);

  useEffect(() => {
    const cargarRecomendaciones = async () => {
      try {
        setLoadingRecomendaciones(true);
        const modoTransporte = MODO_NOMBRE_POR_ID[preferencias?.modo_transporte_id];
        const recomendaciones = await obtenerCircuitosRecomendados(location, modoTransporte);
        setCircuitosRecomendados(recomendaciones);
      } catch (error) {
        console.error("Error cargando recomendaciones:", error);
        toast.error(t("circuits.recommendedError"));
      } finally {
        setLoadingRecomendaciones(false);
      }
    };

    if (circuitos.length > 0) {
      cargarRecomendaciones();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circuitos.length, latAprox, lonAprox, preferencias?.modo_transporte_id, user?.usuario_id, t]);

  useEffect(() => {
    if (!location?.latitude || !location?.longitude) {
      setCircuitosCercanos([]);
      return;
    }

    const cargarCircuitosCercanos = async () => {
      try {
        const todos = await circuitosService.getAll({
          lat: location.latitude,
          lon: location.longitude,
          ordenarPorDistancia: true,
        });
        setCircuitosCercanos(todos.slice(0, 3));
      } catch (error) {
        console.error("Error cargando circuitos cercanos:", error);
        toast.error(t("circuits.nearbyError"));
        setCircuitosCercanos([]);
      }
    };

    cargarCircuitosCercanos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latAprox, lonAprox, user?.usuario_id, t]);

  const circuitosPorCategoria = React.useMemo(() => {
    const grupos = {};

    circuitos.forEach((circuito) => {
      let nombreCategoria = "Sin categoría";

      if (circuito.categoria) {
        if (typeof circuito.categoria === "object") {
          nombreCategoria =
            circuito.categoria.nombre_categoria || "Sin categoría";
        } else if (typeof circuito.categoria === "string") {
          nombreCategoria = circuito.categoria;
        }
      }

      if (!grupos[nombreCategoria]) {
        grupos[nombreCategoria] = [];
      }
      grupos[nombreCategoria].push(circuito);
    });

    return grupos;
  }, [circuitos]);

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
        <Typography color="error">
          {t("circuits.error")}
          {typeof error === "string" ? `: ${error}` : ""}
        </Typography>
      </Box>
    );
  }

  if (!circuitos || circuitos.length === 0) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <Typography color="text.secondary">
          {t("circuits.empty")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {!loadingRecomendaciones && circuitosRecomendados.length > 0 && (
        <>
          <CircuitosRecomendados circuitos={circuitosRecomendados} />
        </>
      )}

      {circuitosCercanos.length > 0 && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <LocationOnIcon sx={{ color: "#E53935", fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              {t("circuits.nearby")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            {circuitosCercanos.map((circuito) => (
              <Box key={circuito.circuito_id} sx={{ width: "100%" }}>
                <CardCircuitos
                  circuito={circuito}
                  onClick={handleCircuitoClick}
                />
              </Box>
            ))}
          </Box>
        </>
      )}

      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          textTransform: "uppercase",
          color: "text.secondary",
          fontSize: 11,
          letterSpacing: 0.5,
          mb: 2,
          mt: 2,
        }}
      >
        {t("circuits.all")}
      </Typography>

      {Object.entries(circuitosPorCategoria).map(
        ([categoria, circuitosCategoria]) => (
          <Box key={categoria} sx={{ mb: 3 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: "text.secondary",
                fontSize: 16,
                mb: 1.5,
              }}
            >
              {categoria}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {circuitosCategoria.map((circuito) => (
                <Box key={circuito.circuito_id} sx={{ width: "100%" }}>
                  <CardCircuitos
                    circuito={circuito}
                    onClick={handleCircuitoClick}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        ),
      )}
    </Box>
  );
};

export default CircuitosView;
