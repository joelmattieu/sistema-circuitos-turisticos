"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../context/AuthContext";
import { fetchPaises } from "../../store/paises/paisesSlice";
import { fetchProvinciasByPais } from "../../store/provincias/provinciasSlice";
import { toast } from "react-toastify";

const GradientBackground = styled(Box)(({ theme }) => ({
  background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.tertiary.main} 100%)`,
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxSizing: "border-box",
}));

const RegisterCard = styled(Card)({
  borderRadius: "12px",
  padding: "40px 30px",
  paddingBottom: "25px",
  width: "100%",
  maxWidth: "375px",
  textAlign: "center",
  boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
  margin: "0 auto",
});

const StyledButton = styled(Button)({
  backgroundColor: "#FF9800",
  color: "white",
  borderRadius: "12px",
  fontSize: "13px",
  fontWeight: 500,
  textTransform: "none",
  marginTop: "20px",
  width: "120px",
  height: "38px",
  "&:hover": {
    backgroundColor: "#F57C00",
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    height: "30px",
    fontSize: "13px",
    border: "1px solid #e0e0e0",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid #FF9800",
    },
    "&.Mui-error fieldset": {
      border: "2px solid #f44336",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "14px 16px",
  },
});

const StyledSelect = styled(Select)({
  borderRadius: "8px",
  height: "30px",
  fontSize: "13px",
  border: "1px solid #e0e0e0",
  "& fieldset": {
    border: "none",
  },
  "&:hover fieldset": {
    border: "none",
  },
  "&.Mui-focused fieldset": {
    border: "2px solid #FF9800",
  },
  "&.Mui-error fieldset": {
    border: "2px solid #f44336",
  },
  "& .MuiSelect-select": {
    padding: "14px 16px",
  },
});

const Register = () => {
  const { register } = useContext(AuthContext);
  const dispatch = useDispatch();

  const { paises, loading: paisesLoading } = useSelector(
    (state) => state.paises
  );
  const {
    provincias,
    provinciasFiltradas,
    loading: provinciasLoading,
  } = useSelector((state) => state.provincias);

  const [loading, setLoading] = useState(false);
  const [selectedPaisId, setSelectedPaisId] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      pais_id: "",
      provincia_id: "",
      ciudad: "",
      fecha_nacimiento: "",
      contrasena: "",
      confirmPassword: "",
    },
  });

  const paisWatched = watch("pais_id");
  const provinciaWatched = watch("provincia_id");
  const passwordWatched = watch("contrasena");

  useEffect(() => {
    if (paisWatched) {
      setSelectedPaisId(parseInt(paisWatched));
      setValue("provincia_id", "");
      dispatch(fetchProvinciasByPais(parseInt(paisWatched)));
    }
  }, [paisWatched, dispatch, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { confirmPassword, pais_id, ...registerData } = data;
      await register(registerData);
      toast.success("¡Usuario registrado exitosamente!");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = {
    marginBottom: "12px",
    textAlign: "left",
  };

  const labelStyle = {
    fontWeight: 500,
    fontSize: "13px",
  };

  return (
    <GradientBackground>
      <RegisterCard>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontWeight: 700,
            marginBottom: "30px",
            fontSize: { xs: "20px", sm: "28px" },
          }}
        >
          Regístrate
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre */}
          <Box sx={fieldStyle}>
            <Typography variant="body1" sx={labelStyle}>
              Nombre
            </Typography>
            <Controller
              name="nombre"
              control={control}
              rules={{
                required: "El nombre es obligatorio",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
              }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  error={!!errors.nombre}
                  helperText={errors.nombre?.message}
                />
              )}
            />
          </Box>

          {/* Apellido */}
          <Box sx={fieldStyle}>
            <Typography variant="body1" sx={labelStyle}>
              Apellido
            </Typography>
            <Controller
              name="apellido"
              control={control}
              rules={{
                required: "El apellido es obligatorio",
                minLength: {
                  value: 2,
                  message: "El apellido debe tener al menos 2 caracteres",
                },
              }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  error={!!errors.apellido}
                  helperText={errors.apellido?.message}
                />
              )}
            />
          </Box>

          {/* Fecha de Nacimiento */}
          <Box sx={fieldStyle}>
            <Typography variant="body1" sx={labelStyle}>
              Fecha de Nacimiento
            </Typography>
            <Controller
              name="fecha_nacimiento"
              control={control}
              rules={{
                required: "La fecha de nacimiento es obligatoria",
                validate: (value) => {
                  const today = new Date();
                  const birthDate = new Date(value);
                  const age =
                    today.getFullYear() -
                    birthDate.getFullYear() -
                    (today.getMonth() < birthDate.getMonth() ||
                      (today.getMonth() === birthDate.getMonth() &&
                        today.getDate() < birthDate.getDate()));

                  if (age < 13) return "Debes tener al menos 13 años";
                  if (age > 120) return "Fecha de nacimiento inválida";
                  return true;
                },
              }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.fecha_nacimiento}
                  helperText={errors.fecha_nacimiento?.message}
                />
              )}
            />
          </Box>

          {/* Email */}
          <Box sx={fieldStyle}>
            <Typography variant="body1" sx={labelStyle}>
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "El email es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Formato de email inválido",
                },
              }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Box>

          {/* País */}
          <Box sx={fieldStyle}>
            <Typography variant="body1" sx={labelStyle}>
              País
            </Typography>
            <Controller
              name="pais_id"
              control={control}
              rules={{ required: "Selecciona un país" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.pais_id}>
                  <StyledSelect
                    {...field}
                    displayEmpty
                    disabled={paisesLoading}
                    renderValue={(value) =>
                      value
                        ? paises.find((p) => p.pais_id === parseInt(value))
                            ?.nombre_pais
                        : paisesLoading
                        ? "Cargando países..."
                        : ""
                    }
                  >
                    <MenuItem value="" disabled>
                      {paisesLoading
                        ? "Cargando países..."
                        : "Selecciona un país"}
                    </MenuItem>
                    {paises.map((pais) => (
                      <MenuItem key={pais.pais_id} value={pais.pais_id}>
                        {pais.nombre_pais}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                  {errors.pais_id && (
                    <FormHelperText>{errors.pais_id.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Box>

          {/* Provincia */}
          <Box sx={fieldStyle}>
            <Typography variant="body1" sx={labelStyle}>
              Provincia
            </Typography>
            <Controller
              name="provincia_id"
              control={control}
              rules={{ required: "Selecciona una provincia" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.provincia_id}>
                  <StyledSelect
                    {...field}
                    displayEmpty
                    disabled={!selectedPaisId || provinciasLoading}
                    renderValue={(value) => {
                      if (!value) {
                        if (!selectedPaisId) return "";
                        if (provinciasLoading) return "Cargando provincias...";
                        return "";
                      }
                      return provinciasFiltradas.find(
                        (p) => p.provincia_id === parseInt(value)
                      )?.nombre_provincia;
                    }}
                  >
                    <MenuItem value="" disabled>
                      {!selectedPaisId
                        ? "Primero selecciona un país"
                        : provinciasLoading
                        ? "Cargando provincias..."
                        : "Selecciona una provincia"}
                    </MenuItem>
                    {provinciasFiltradas.map((provincia) => (
                      <MenuItem
                        key={provincia.provincia_id}
                        value={provincia.provincia_id}
                      >
                        {provincia.nombre_provincia}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                  {errors.provincia_id && (
                    <FormHelperText>
                      {errors.provincia_id.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Box>

          {/* Ciudad */}
          <Box sx={fieldStyle}>
            <Typography variant="body1" sx={labelStyle}>
              Ciudad
            </Typography>
            <Controller
              name="ciudad"
              control={control}
              rules={{
                required: "La ciudad es obligatoria",
                minLength: {
                  value: 2,
                  message: "La ciudad debe tener al menos 2 caracteres",
                },
              }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  error={!!errors.ciudad}
                  helperText={errors.ciudad?.message}
                />
              )}
            />
          </Box>

          {/* Contraseña */}
          <Box sx={fieldStyle}>
            <Typography variant="body1" sx={labelStyle}>
              Contraseña
            </Typography>
            <Controller
              name="contrasena"
              control={control}
              rules={{
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  type="password"
                  error={!!errors.contrasena}
                  helperText={errors.contrasena?.message}
                />
              )}
            />
          </Box>

          {/* Repetir contraseña */}
          <Box sx={fieldStyle}>
            <Typography variant="body1" sx={labelStyle}>
              Repetir contraseña
            </Typography>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirma tu contraseña",
                validate: (value) =>
                  value === passwordWatched || "Las contraseñas no coinciden",
              }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  fullWidth
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              color: "#000",
              marginBottom: "20px",
              fontSize: "13px",
            }}
          >
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              sx={{
                color: "#FF9800",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Inicia sesión
            </Link>
          </Typography>

          <StyledButton
            type="submit"
            size="large"
            disabled={loading || paisesLoading || provinciasLoading}
          >
            {loading ? "Registrando..." : "Registrarme"}
          </StyledButton>
        </form>
      </RegisterCard>
    </GradientBackground>
  );
};

export default Register;
