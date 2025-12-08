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
  Alert,
  IconButton,
  Menu,
} from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../context/AuthContext";
import { LanguageContext } from "../../context/LanguageContext";
import { fetchPaises } from "../../store/paises/paisesSlice";
import { fetchProvinciasByPais } from "../../store/provincias/provinciasSlice";

const GradientBackground = styled(Box)(({ theme }) => ({
  background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.tertiary.main} 100%)`,
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxSizing: "border-box",
  position: "relative",
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
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: 500,
  textTransform: "none",
  marginTop: "20px",
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
  const { t, changeLanguage } = useContext(LanguageContext);
  const dispatch = useDispatch();

  const { paises, loading: paisesLoading } = useSelector(
    (state) => state.paises
  );
  const { provinciasFiltradas, loading: provinciasLoading } = useSelector(
    (state) => state.provincias
  );

  const [loading, setLoading] = useState(false);
  const [selectedPaisId, setSelectedPaisId] = useState(null);
  const [registerError, setRegisterError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

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
  const passwordWatched = watch("contrasena");

  useEffect(() => {
    dispatch(fetchPaises());
  }, [dispatch]);

  useEffect(() => {
    if (paisWatched) {
      setSelectedPaisId(parseInt(paisWatched));
      setValue("provincia_id", "");
      dispatch(fetchProvinciasByPais(parseInt(paisWatched)));
    }
  }, [paisWatched, dispatch, setValue]);

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = (idioma) => {
    if (idioma) {
      changeLanguage(idioma);
    }
    setAnchorEl(null);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setRegisterError("");
    try {
      const { confirmPassword, pais_id, ...registerData } = data;
      await register(registerData);
    } catch (error) {
      setRegisterError(error.response?.data?.detail || t("register.error"));
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
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <IconButton
          onClick={handleLanguageClick}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleLanguageClose(null)}
        >
          <MenuItem onClick={() => handleLanguageClose("es")}>
            🇦🇷 Español
          </MenuItem>
          <MenuItem onClick={() => handleLanguageClose("en")}>
            🇺🇸 English
          </MenuItem>
          <MenuItem onClick={() => handleLanguageClose("pt")}>
            🇧🇷 Português
          </MenuItem>
        </Menu>
      </Box>

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
          {t("register.title")}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {registerError && (
            <Alert
              severity="error"
              sx={{
                marginBottom: "20px",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            >
              {registerError}
            </Alert>
          )}

          {/* Nombre */}
          <Box sx={fieldStyle}>
            <Typography variant="body1" sx={labelStyle}>
              {t("register.name")}
            </Typography>
            <Controller
              name="nombre"
              control={control}
              rules={{
                required: t("validation.nameRequired"),
                minLength: {
                  value: 2,
                  message: t("validation.nameMin"),
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
              {t("register.lastName")}
            </Typography>
            <Controller
              name="apellido"
              control={control}
              rules={{
                required: t("validation.lastNameRequired"),
                minLength: {
                  value: 2,
                  message: t("validation.lastNameMin"),
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
              {t("register.birthdate")}
            </Typography>
            <Controller
              name="fecha_nacimiento"
              control={control}
              rules={{
                required: t("validation.birthdateRequired"),
                validate: (value) => {
                  const today = new Date();
                  const birthDate = new Date(value);
                  const age =
                    today.getFullYear() -
                    birthDate.getFullYear() -
                    (today.getMonth() < birthDate.getMonth() ||
                      (today.getMonth() === birthDate.getMonth() &&
                        today.getDate() < birthDate.getDate()));

                  if (age < 13) return t("validation.ageMin");
                  if (age > 120) return t("validation.ageMax");
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
              {t("register.email")}
            </Typography>
            <Controller
              name="email"
              control={control}
              rules={{
                required: t("validation.emailRequired"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("validation.emailInvalid"),
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
              {t("register.country")}
            </Typography>
            <Controller
              name="pais_id"
              control={control}
              rules={{ required: t("validation.countryRequired") }}
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
                        ? t("register.loadingCountries")
                        : ""
                    }
                  >
                    <MenuItem value="" disabled>
                      {paisesLoading
                        ? t("register.loadingCountries")
                        : t("register.selectCountry")}
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
              {t("register.province")}
            </Typography>
            <Controller
              name="provincia_id"
              control={control}
              rules={{ required: t("validation.provinceRequired") }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.provincia_id}>
                  <StyledSelect
                    {...field}
                    displayEmpty
                    disabled={!selectedPaisId || provinciasLoading}
                    renderValue={(value) => {
                      if (!value) {
                        if (!selectedPaisId) return "";
                        if (provinciasLoading)
                          return t("register.loadingProvinces");
                        return "";
                      }
                      return provinciasFiltradas.find(
                        (p) => p.provincia_id === parseInt(value)
                      )?.nombre_provincia;
                    }}
                  >
                    <MenuItem value="" disabled>
                      {!selectedPaisId
                        ? t("register.selectProvinceFirst")
                        : provinciasLoading
                        ? t("register.loadingProvinces")
                        : t("register.selectProvince")}
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
              {t("register.city")}
            </Typography>
            <Controller
              name="ciudad"
              control={control}
              rules={{
                required: t("validation.cityRequired"),
                minLength: {
                  value: 2,
                  message: t("validation.cityMin"),
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
              {t("register.password")}
            </Typography>
            <Controller
              name="contrasena"
              control={control}
              rules={{
                required: t("validation.passwordRequired"),
                minLength: {
                  value: 6,
                  message: t("validation.passwordMin"),
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
              {t("register.confirmPassword")}
            </Typography>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: t("validation.confirmPasswordRequired"),
                validate: (value) =>
                  value === passwordWatched || t("validation.passwordMatch"),
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

          <StyledButton
            type="submit"
            fullWidth
            size="large"
            disabled={loading || paisesLoading || provinciasLoading}
          >
            {t("register.button")}
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
            {t("register.hasAccount")}{" "}
            <Link
              href="/login"
              sx={{
                color: "#FF9800",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {t("register.login")}
            </Link>
          </Typography>
        </form>
      </RegisterCard>
    </GradientBackground>
  );
};

export default Register;
