"use client";
import React, { useContext, useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../../context/AuthContext";

const GradientBackground = styled(Box)(({ theme }) => ({
  background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.tertiary.main} 100%)`,
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxSizing: "border-box",
}));

const LoginCard = styled(Card)({
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
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: 500,
  textTransform: "none",
  marginTop: "10px",
  height: "35px",
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

const Login = () => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      contrasena: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setLoginError("");
    try {
      await login(data);
    } catch (error) {
      setLoginError(error.response?.data?.detail || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <LoginCard>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontWeight: 700,
            color: "#333",
            marginBottom: "40px",
            fontSize: { xs: "20px", sm: "28px" },
          }}
        >
          Inicia Sesión
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {loginError && (
            <Alert
              severity="error"
              sx={{
                marginBottom: "20px",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            >
              {loginError}
            </Alert>
          )}

          <Box sx={{ marginBottom: "20px", textAlign: "left" }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
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

          <Box sx={{ marginBottom: "18px", textAlign: "left" }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
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

          <StyledButton type="submit" fullWidth size="large" disabled={loading}>
            {loading ? "Iniciando..." : "Ingresar"}
          </StyledButton>

          <Typography
            variant="body2"
            sx={{
              color: "#000",
              marginTop: "20px",
              marginBottom: "18px",
              fontSize: "13px",
            }}
          >
            ¿Aún no tienes una cuenta?{" "}
            <Link
              href="/register"
              sx={{
                color: "#FF9800",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Regístrate
            </Link>
          </Typography>
        </form>
      </LoginCard>
    </GradientBackground>
  );
};

export default Login;
