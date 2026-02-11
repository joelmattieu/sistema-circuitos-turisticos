"use client";
import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { fetchCircuitos } from "../store/circuitos/circuitosSlice";
import { fetchPreferenciasByUsuario } from "../store/preferencias/preferenciasSlice";
import CardCircuitos from "../components/circuitos/CardCircuitos";
import CircuitosRecomendados from "../components/circuitos/CircuitosRecomendados";
import { obtenerCircuitosRecomendados } from "../services/recomendaciones";
import { LanguageContext } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useGeolocation } from "@/hooks/useGeolocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const CircuitosView = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useContext(LanguageContext);
  const { user } = useAuth();
  const { location } = useGeolocation();
  const { circuitos, loading, error } = useSelector((state) => state.circuitos);
  const { preferencias } = useSelector((state) => state.preferencias);
  const [circuitosRecomendados, setCircuitosRecomendados] = useState([]);
  const [loadingRecomendaciones, setLoadingRecomendaciones] = useState(true);

  useEffect(() => {
    if (user?.usuario_id) {
      dispatch(fetchCircuitos(user.usuario_id));
    } else {
      dispatch(fetchCircuitos());
    }
  }, [dispatch, user?.usuario_id]);

  useEffect(() => {
    if (user?.usuario_id && !preferencias) {
      dispatch(fetchPreferenciasByUsuario(user.usuario_id));
    }
  }, [dispatch, user?.usuario_id, preferencias]);

  useEffect(() => {
    const cargarRecomendaciones = async () => {
      try {
        setLoadingRecomendaciones(true);
        const modoTransporte = preferencias?.modo_transporte?.nombre;
        const recomendaciones = await obtenerCircuitosRecomendados(
          location,
          modoTransporte,
          user?.usuario_id,
        );
        setCircuitosRecomendados(recomendaciones);
      } catch (error) {
        console.error("Error cargando recomendaciones:", error);
      } finally {
        setLoadingRecomendaciones(false);
      }
    };

    if (circuitos.length > 0) {
      cargarRecomendaciones();
    }
  }, [
    circuitos.length,
    location?.latitude,
    location?.longitude,
    preferencias?.modo_transporte?.nombre,
    user?.usuario_id,
  ]);

  // Haversine
  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const circuitosCercanos = React.useMemo(() => {
    if (!location || !circuitos.length) return [];

    const circuitosConDistancia = circuitos
      .map((circuito) => {
        const primerPunto = circuito.puntos_interes?.[0];
        if (!primerPunto) return null;

        const distancia = calcularDistancia(
          location.latitude,
          location.longitude,
          primerPunto.latitud,
          primerPunto.longitud,
        );

        return {
          ...circuito,
          distancia_calculada: distancia,
        };
      })
      .filter((c) => c !== null)
      .sort((a, b) => a.distancia_calculada - b.distancia_calculada)
      .slice(0, 3); // Top 3 más cercanos

    return circuitosConDistancia;
  }, [circuitos, location]);

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
          {t("circuits.error")}: {error}
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
              Cercanos a ti
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
        TODOS LOS CIRCUITOS
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
