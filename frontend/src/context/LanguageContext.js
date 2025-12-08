"use client";
import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

const translations = {
  es: {
    // Auth - Login
    "login.title": "Inicia Sesión",
    "login.email": "Email",
    "login.password": "Contraseña",
    "login.button": "Ingresar",
    "login.noAccount": "¿Aún no tienes una cuenta?",
    "login.register": "Regístrate",
    "login.error": "Error al iniciar sesión",

    // Auth - Register
    "register.title": "Regístrate",
    "register.name": "Nombre",
    "register.lastName": "Apellido",
    "register.birthdate": "Fecha de Nacimiento",
    "register.email": "Email",
    "register.country": "País",
    "register.province": "Provincia",
    "register.city": "Ciudad",
    "register.password": "Contraseña",
    "register.confirmPassword": "Repetir contraseña",
    "register.button": "Registrarme",
    "register.hasAccount": "¿Ya tienes una cuenta?",
    "register.login": "Inicia sesión",
    "register.selectCountry": "Selecciona un país",
    "register.selectProvince": "Selecciona una provincia",
    "register.selectProvinceFirst": "Primero selecciona un país",
    "register.loadingCountries": "Cargando países...",
    "register.loadingProvinces": "Cargando provincias...",
    "register.error": "Error al registrar usuario",

    // Home
    "home.welcome": "Hola, {name}",
    "home.welcomeGuest": "Bienvenido!",
    "home.chooseCircuit": "Elige tu próximo circuito",

    // Menu
    "menu.home": "Inicio",
    "menu.preferences": "Preferencias",
    "menu.logout": "Cerrar sesión",

    // Circuit Detail
    "circuit.title": "CIRCUITO {name}",
    "circuit.start": "Comenzar Circuito",
    "circuit.pois": "PUNTOS DE INTERÉS",
    "circuit.loading": "Cargando circuito...",
    "circuit.error": "Error al cargar el circuito",

    // Preferences
    "preferences.title": "Preferencias",
    "preferences.language": "IDIOMA",
    "preferences.transport": "MODO DE TRANSPORTE",
    "preferences.unit": "UNIDAD DE MEDICIÓN",
    "preferences.save": "Guardar Preferencias",
    "preferences.saving": "Guardando...",
    "preferences.success": "Preferencias guardadas correctamente",
    "preferences.error": "Error al guardar preferencias",
    "preferences.warning": "Por favor completa todas las preferencias",
    "preferences.loading": "Cargando preferencias...",

    // Transport modes
    "transport.walk": "A pie",
    "transport.car": "Automóvil",
    "transport.bike": "Bicicleta",

    // Units
    "unit.km": "Kilómetros",
    "unit.miles": "Millas",

    // Validations
    "validation.emailRequired": "El email es obligatorio",
    "validation.emailInvalid": "Formato de email inválido",
    "validation.passwordRequired": "La contraseña es obligatoria",
    "validation.passwordMin": "La contraseña debe tener al menos 6 caracteres",
    "validation.passwordMatch": "Las contraseñas no coinciden",
    "validation.nameRequired": "El nombre es obligatorio",
    "validation.nameMin": "El nombre debe tener al menos 2 caracteres",
    "validation.lastNameRequired": "El apellido es obligatorio",
    "validation.lastNameMin": "El apellido debe tener al menos 2 caracteres",
    "validation.birthdateRequired": "La fecha de nacimiento es obligatoria",
    "validation.ageMin": "Debes tener al menos 13 años",
    "validation.ageMax": "Fecha de nacimiento inválida",
    "validation.countryRequired": "Selecciona un país",
    "validation.provinceRequired": "Selecciona una provincia",
    "validation.cityRequired": "La ciudad es obligatoria",
    "validation.cityMin": "La ciudad debe tener al menos 2 caracteres",
    "validation.confirmPasswordRequired": "Confirma tu contraseña",
  },
  en: {
    // Auth - Login
    "login.title": "Log In",
    "login.email": "Email",
    "login.password": "Password",
    "login.button": "Sign In",
    "login.noAccount": "Don't have an account?",
    "login.register": "Sign Up",
    "login.error": "Login error",

    // Auth - Register
    "register.title": "Sign Up",
    "register.name": "Name",
    "register.lastName": "Last Name",
    "register.birthdate": "Birth Date",
    "register.email": "Email",
    "register.country": "Country",
    "register.province": "Province",
    "register.city": "City",
    "register.password": "Password",
    "register.confirmPassword": "Confirm Password",
    "register.button": "Sign Up",
    "register.hasAccount": "Already have an account?",
    "register.login": "Log In",
    "register.selectCountry": "Select a country",
    "register.selectProvince": "Select a province",
    "register.selectProvinceFirst": "First select a country",
    "register.loadingCountries": "Loading countries...",
    "register.loadingProvinces": "Loading provinces...",
    "register.error": "Registration error",

    // Home
    "home.welcome": "Hello, {name}",
    "home.welcomeGuest": "Welcome!",
    "home.chooseCircuit": "Choose your next circuit",

    // Menu
    "menu.home": "Home",
    "menu.preferences": "Preferences",
    "menu.logout": "Log Out",

    // Circuit Detail
    "circuit.title": "CIRCUIT {name}",
    "circuit.start": "Start Circuit",
    "circuit.pois": "POINTS OF INTEREST",
    "circuit.loading": "Loading circuit...",
    "circuit.error": "Error loading circuit",

    // Preferences
    "preferences.title": "Preferences",
    "preferences.language": "LANGUAGE",
    "preferences.transport": "TRANSPORT MODE",
    "preferences.unit": "MEASUREMENT UNIT",
    "preferences.save": "Save Preferences",
    "preferences.saving": "Saving...",
    "preferences.success": "Preferences saved successfully",
    "preferences.error": "Error saving preferences",
    "preferences.warning": "Please complete all preferences",
    "preferences.loading": "Loading preferences...",

    // Transport modes
    "transport.walk": "Walking",
    "transport.car": "Car",
    "transport.bike": "Bicycle",

    // Units
    "unit.km": "Kilometers",
    "unit.miles": "Miles",

    // Validations
    "validation.emailRequired": "Email is required",
    "validation.emailInvalid": "Invalid email format",
    "validation.passwordRequired": "Password is required",
    "validation.passwordMin": "Password must be at least 6 characters",
    "validation.passwordMatch": "Passwords don't match",
    "validation.nameRequired": "Name is required",
    "validation.nameMin": "Name must be at least 2 characters",
    "validation.lastNameRequired": "Last name is required",
    "validation.lastNameMin": "Last name must be at least 2 characters",
    "validation.birthdateRequired": "Birth date is required",
    "validation.ageMin": "You must be at least 13 years old",
    "validation.ageMax": "Invalid birth date",
    "validation.countryRequired": "Select a country",
    "validation.provinceRequired": "Select a province",
    "validation.cityRequired": "City is required",
    "validation.cityMin": "City must be at least 2 characters",
    "validation.confirmPasswordRequired": "Confirm your password",
  },
  pt: {
    // Auth - Login
    "login.title": "Iniciar Sessão",
    "login.email": "Email",
    "login.password": "Senha",
    "login.button": "Entrar",
    "login.noAccount": "Ainda não tem uma conta?",
    "login.register": "Cadastre-se",
    "login.error": "Erro ao fazer login",

    // Auth - Register
    "register.title": "Cadastre-se",
    "register.name": "Nome",
    "register.lastName": "Sobrenome",
    "register.birthdate": "Data de Nascimento",
    "register.email": "Email",
    "register.country": "País",
    "register.province": "Província",
    "register.city": "Cidade",
    "register.password": "Senha",
    "register.confirmPassword": "Repetir Senha",
    "register.button": "Cadastrar",
    "register.hasAccount": "Já tem uma conta?",
    "register.login": "Iniciar sessão",
    "register.selectCountry": "Selecione um país",
    "register.selectProvince": "Selecione uma província",
    "register.selectProvinceFirst": "Primeiro selecione um país",
    "register.loadingCountries": "Carregando países...",
    "register.loadingProvinces": "Carregando províncias...",
    "register.error": "Erro ao cadastrar usuário",

    // Home
    "home.welcome": "Olá, {name}",
    "home.welcomeGuest": "Bem-vindo!",
    "home.chooseCircuit": "Escolha seu próximo circuito",

    // Menu
    "menu.home": "Início",
    "menu.preferences": "Preferências",
    "menu.logout": "Sair",

    // Circuit Detail
    "circuit.title": "CIRCUITO {name}",
    "circuit.start": "Começar Circuito",
    "circuit.pois": "PONTOS DE INTERESSE",
    "circuit.loading": "Carregando circuito...",
    "circuit.error": "Erro ao carregar circuito",

    // Preferences
    "preferences.title": "Preferências",
    "preferences.language": "IDIOMA",
    "preferences.transport": "MODO DE TRANSPORTE",
    "preferences.unit": "UNIDADE DE MEDIÇÃO",
    "preferences.save": "Salvar Preferências",
    "preferences.saving": "Salvando...",
    "preferences.success": "Preferências salvas com sucesso",
    "preferences.error": "Erro ao salvar preferências",
    "preferences.warning": "Por favor complete todas as preferências",
    "preferences.loading": "Carregando preferências...",

    // Transport modes
    "transport.walk": "A pé",
    "transport.car": "Automóvel",
    "transport.bike": "Bicicleta",

    // Units
    "unit.km": "Quilômetros",
    "unit.miles": "Milhas",

    // Validations
    "validation.emailRequired": "O email é obrigatório",
    "validation.emailInvalid": "Formato de email inválido",
    "validation.passwordRequired": "A senha é obrigatória",
    "validation.passwordMin": "A senha deve ter pelo menos 6 caracteres",
    "validation.passwordMatch": "As senhas não coincidem",
    "validation.nameRequired": "O nome é obrigatório",
    "validation.nameMin": "O nome deve ter pelo menos 2 caracteres",
    "validation.lastNameRequired": "O sobrenome é obrigatório",
    "validation.lastNameMin": "O sobrenome deve ter pelo menos 2 caracteres",
    "validation.birthdateRequired": "A data de nascimento é obrigatória",
    "validation.ageMin": "Você deve ter pelo menos 13 anos",
    "validation.ageMax": "Data de nascimento inválida",
    "validation.countryRequired": "Selecione um país",
    "validation.provinceRequired": "Selecione uma província",
    "validation.cityRequired": "A cidade é obrigatória",
    "validation.cityMin": "A cidade deve ter pelo menos 2 caracteres",
    "validation.confirmPasswordRequired": "Confirme sua senha",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    const savedLang = localStorage.getItem("idioma");
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("idioma", lang);
  };

  const t = (key, params = {}) => {
    let text = translations[language]?.[key] || key;

    // reemplaza los parámetros {name} con valores
    Object.keys(params).forEach((param) => {
      text = text.replace(`{${param}}`, params[param]);
    });

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
