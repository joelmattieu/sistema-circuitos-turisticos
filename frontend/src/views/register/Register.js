"use client";
import React, { useState, useEffect } from "react";
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

const paises = [
  { id: 1, nombre: "Argentina" },
  { id: 2, nombre: "Chile" },
  { id: 3, nombre: "Brasil" },
];

const provincias = [
  { id: 1, nombre: "Córdoba", paisId: 1 },
  { id: 2, nombre: "Buenos Aires", paisId: 1 },
  { id: 3, nombre: "Santa Fe", paisId: 1 },
];

const Register = () => {
  const [paisSeleccionado, setPaisSeleccionado] = useState("");
  const [provinciasFiltradas, setProvinciasFiltradas] = useState([]);

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
      paisId: "",
      provinciaId: "",
      ciudad: "",
      password: "",
      confirmPassword: "",
    },
  });

  const paisWatched = watch("paisId");
  const passwordWatched = watch("password");

  useEffect(() => {
    if (paisWatched) {
      const provinciasPorPais = provincias.filter(
        (provincia) => provincia.paisId === parseInt(paisWatched)
      );
      setProvinciasFiltradas(provinciasPorPais);
      setValue("provinciaId", ""); 
    } else {
      setProvinciasFiltradas([]);
    }
  }, [paisWatched, setValue]);

  const onSubmit = (data) => {
    console.log("Datos de registro:", data);
  };

  const fieldStyle = {
    marginBottom: "12px",
    textAlign: "left",
  };

  const labelStyle = {
    fontWeight: 500,
    fontSize: "13px"
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
              name="paisId"
              control={control}
              rules={{ required: "Selecciona un país" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.paisId}>
                  <StyledSelect
                    {...field}
                    displayEmpty
                    renderValue={(value) =>
                      value
                        ? paises.find((p) => p.id === parseInt(value))?.nombre
                        : ""
                    }
                  >
                    <MenuItem value="" disabled>
                      Selecciona un país
                    </MenuItem>
                    {paises.map((pais) => (
                      <MenuItem key={pais.id} value={pais.id}>
                        {pais.nombre}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                  {errors.paisId && (
                    <FormHelperText>{errors.paisId.message}</FormHelperText>
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
              name="provinciaId"
              control={control}
              rules={{ required: "Selecciona una provincia" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.provinciaId}>
                  <StyledSelect
                    {...field}
                    displayEmpty
                    disabled={!paisWatched}
                    renderValue={(value) =>
                      value
                        ? provinciasFiltradas.find(
                            (p) => p.id === parseInt(value)
                          )?.nombre
                        : ""
                    }
                  >
                    <MenuItem value="" disabled>
                      Selecciona una provincia
                    </MenuItem>
                    {provinciasFiltradas.map((provincia) => (
                      <MenuItem key={provincia.id} value={provincia.id}>
                        {provincia.nombre}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                  {errors.provinciaId && (
                    <FormHelperText>
                      {errors.provinciaId.message}
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
              name="password"
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
                  error={!!errors.password}
                  helperText={errors.password?.message}
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

          <StyledButton type="submit" size="large">
            Registrarme
          </StyledButton>
        </form>
      </RegisterCard>
    </GradientBackground>
  );
};

export default Register;
