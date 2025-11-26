"use client";
import React, { useState } from "react";
import { Box, Card, TextField, Button, Typography, Link } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

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
  borderRadius: "12px",
  fontSize: "13px",
  fontWeight: 500,
  textTransform: "none",
  marginTop: "20px",
  width: "98px",
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
  },
  "& .MuiOutlinedInput-input": {
    padding: "14px 16px",
  },
});

const Login = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", formData);
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

        <form onSubmit={handleSubmit}>
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
            <StyledTextField
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
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
            <StyledTextField
              fullWidth
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              color: "#000",
              marginBottom: "30px",
              fontSize: "13px",
            }}
          >
            ¿Aún no tienes una cuenta?{" "}
            <Link
              href="/register"
              sx={{
                color: "#FF9800",
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              Regístrate
            </Link>
          </Typography>

          <StyledButton type="submit" fullWidth size="large">
            Ingresar
          </StyledButton>
        </form>
      </LoginCard>
    </GradientBackground>
  );
};

export default Login;
