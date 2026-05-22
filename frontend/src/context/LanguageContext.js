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

    // Circuits List
    "circuits.error": "Error al cargar los circuitos",
    "circuits.empty": "No hay circuitos disponibles",
    "circuits.nearby": "Cercanos a ti",
    "circuits.all": "TODOS LOS CIRCUITOS",
    "circuits.recommendedError": "No se pudieron cargar las recomendaciones",
    "circuits.nearbyError": "No se pudieron cargar los circuitos cercanos",

    // Circuit Detail
    "circuit.title": "CIRCUITO {name}",
    "circuit.start": "Comenzar Circuito",
    "circuit.continue": "Continuar Circuito",
    "circuit.pedestrianWarning": "Este circuito incluye tramos peatonales no accesibles en automóvil. La duración se calcula a pie.",
    "circuit.pois": "PUNTOS DE INTERÉS",
    "circuit.loading": "Cargando circuito...",
    "circuit.error": "Error al cargar el circuito",

    // Navigation
    "nav.completed": "¡Circuito Completado!",
    "nav.completedMessage": "¡Felicitaciones! Has completado todos los puntos de interés de este circuito.",
    "nav.backHome": "Volver al inicio",
    "nav.stayHere": "Continuar aquí",
    "nav.notFound": "Circuito no encontrado",
    "nav.gettingLocation": "Obteniendo ubicación...",
    "nav.youAreHere": "Estás aquí",
    "nav.noLocation": "No se pueden generar indicaciones sin acceso a la ubicación. Verificá los permisos del navegador.",
    "nav.poiUnavailable": "POI no disponible",
    "nav.arrivedAt": "Llegaste a: {name}",
    "nav.exploreInAR": "Explora en Realidad Aumentada",
    "nav.openInAR": "Abrir en RA",
    "nav.nextDestination": "Próximo destino: {name} · {distance} · {minutes} min",
    "nav.demoStart": "Iniciar Demo",
    "nav.demoStop": "Pausar Demo",
    "nav.poiCounter": "({current} de {total})",
    "nav.readyToFinish": "Recorrido completado",
    "nav.finishCircuit": "Finalizar",

    // Routing instructions (placeholders: {dist}, {street})
    "routing.continue": "Continúa {dist} por {street}",
    "routing.turnRight": "Gira a la derecha y sigue {dist} por {street}",
    "routing.turnLeft": "Gira a la izquierda y sigue {dist} por {street}",
    "routing.turnSharpRight": "Gira fuertemente a la derecha y sigue {dist} por {street}",
    "routing.turnSharpLeft": "Gira fuertemente a la izquierda y sigue {dist} por {street}",
    "routing.turnSlightRight": "Gira ligeramente a la derecha y sigue {dist} por {street}",
    "routing.turnSlightLeft": "Gira ligeramente a la izquierda y sigue {dist} por {street}",
    "routing.roundabout": "Toma la rotonda y sigue {dist} por {street}",
    "routing.head": "Dirígete {dist} por {street}",
    "routing.arrive": "Llegas a {street}",
    "routing.defaultStreet": "esta calle",

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
    "transport.walkShort": "A pie",
    "transport.carShort": "Auto",
    "transport.bikeShort": "Bici",

    // Recommendations
    "recommended.title": "RECOMENDADOS",
    "recommended.sunny": "Hoy es un día soleado",
    "recommended.rainy": "Hoy es un día lluvioso",
    "recommended.cloudy": "Hoy es un día nublado",

    // AR (Realidad Aumentada)
    "ar.poi": "Punto de Interés",
    "ar.culturalInfo": "Información Cultural",
    "ar.activateMotion": "Activar sensor de movimiento",
    "ar.activate": "Activar",
    "ar.cameraPermissionError": "Debes permitir el acceso a la cámara para usar AR.",
    "ar.cameraError": "No se pudo inicializar la cámara.",

    // Units
    "unit.km": "Kilómetros",
    "unit.miles": "Millas",

    // Validations
    "validation.emailRequired": "El email es obligatorio",
    "validation.emailInvalid": "Formato de email inválido",
    "validation.passwordRequired": "La contraseña es obligatoria",
    "validation.passwordMin": "La contraseña debe tener al menos 8 caracteres",
    "validation.passwordUpper": "La contraseña debe tener al menos una letra mayúscula",
    "validation.passwordLower": "La contraseña debe tener al menos una letra minúscula",
    "validation.passwordNumber": "La contraseña debe tener al menos un número",
    "validation.passwordSpecial": "La contraseña debe tener al menos un carácter especial",
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

    // Circuits List
    "circuits.error": "Error loading circuits",
    "circuits.empty": "No circuits available",
    "circuits.nearby": "Near you",
    "circuits.all": "ALL CIRCUITS",
    "circuits.recommendedError": "Could not load recommendations",
    "circuits.nearbyError": "Could not load nearby circuits",

    // Circuit Detail
    "circuit.title": "CIRCUIT {name}",
    "circuit.start": "Start Circuit",
    "circuit.continue": "Continue Circuit",
    "circuit.pedestrianWarning": "This circuit includes pedestrian-only sections not accessible by car. Duration is calculated on foot.",
    "circuit.pois": "POINTS OF INTEREST",
    "circuit.loading": "Loading circuit...",

    // Navigation
    "nav.completed": "Circuit Completed!",
    "nav.completedMessage": "Congratulations! You have completed all the points of interest in this circuit.",
    "nav.backHome": "Back to home",
    "nav.stayHere": "Stay here",
    "nav.notFound": "Circuit not found",
    "nav.gettingLocation": "Getting location...",
    "nav.youAreHere": "You are here",
    "nav.noLocation": "Cannot generate directions without location access. Please check your browser permissions.",
    "nav.poiUnavailable": "POI unavailable",
    "nav.arrivedAt": "You arrived at: {name}",
    "nav.exploreInAR": "Explore in Augmented Reality",
    "nav.openInAR": "Open in AR",
    "nav.nextDestination": "Next destination: {name} · {distance} · {minutes} min",
    "nav.demoStart": "Start Demo",
    "nav.demoStop": "Pause Demo",
    "nav.poiCounter": "({current} of {total})",
    "nav.readyToFinish": "Tour completed",
    "nav.finishCircuit": "Finish",
    "circuit.error": "Error loading circuit",

    // Routing instructions (placeholders: {dist}, {street})
    "routing.continue": "Continue {dist} along {street}",
    "routing.turnRight": "Turn right and continue {dist} along {street}",
    "routing.turnLeft": "Turn left and continue {dist} along {street}",
    "routing.turnSharpRight": "Turn sharp right and continue {dist} along {street}",
    "routing.turnSharpLeft": "Turn sharp left and continue {dist} along {street}",
    "routing.turnSlightRight": "Turn slightly right and continue {dist} along {street}",
    "routing.turnSlightLeft": "Turn slightly left and continue {dist} along {street}",
    "routing.roundabout": "Take the roundabout and continue {dist} along {street}",
    "routing.head": "Head {dist} along {street}",
    "routing.arrive": "You arrive at {street}",
    "routing.defaultStreet": "this street",

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
    "transport.walkShort": "Walk",
    "transport.carShort": "Car",
    "transport.bikeShort": "Bike",

    // Recommendations
    "recommended.title": "RECOMMENDED",
    "recommended.sunny": "It's a sunny day",
    "recommended.rainy": "It's a rainy day",
    "recommended.cloudy": "It's a cloudy day",

    // AR (Augmented Reality)
    "ar.poi": "Point of Interest",
    "ar.culturalInfo": "Cultural Information",
    "ar.activateMotion": "Activate motion sensor",
    "ar.activate": "Activate",
    "ar.cameraPermissionError": "You must allow camera access to use AR.",
    "ar.cameraError": "Could not initialize the camera.",

    // Units
    "unit.km": "Kilometers",
    "unit.miles": "Miles",

    // Validations
    "validation.emailRequired": "Email is required",
    "validation.emailInvalid": "Invalid email format",
    "validation.passwordRequired": "Password is required",
    "validation.passwordMin": "Password must be at least 8 characters",
    "validation.passwordUpper": "Password must contain at least one uppercase letter",
    "validation.passwordLower": "Password must contain at least one lowercase letter",
    "validation.passwordNumber": "Password must contain at least one number",
    "validation.passwordSpecial": "Password must contain at least one special character",
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

    // Circuits List
    "circuits.error": "Erro ao carregar os circuitos",
    "circuits.empty": "Não há circuitos disponíveis",
    "circuits.nearby": "Perto de você",
    "circuits.all": "TODOS OS CIRCUITOS",
    "circuits.recommendedError": "Não foi possível carregar as recomendações",
    "circuits.nearbyError": "Não foi possível carregar os circuitos próximos",

    // Circuit Detail
    "circuit.title": "CIRCUITO {name}",
    "circuit.start": "Começar Circuito",
    "circuit.continue": "Continuar Circuito",
    "circuit.pedestrianWarning": "Este circuito inclui trechos para pedestres não acessíveis de carro. A duração é calculada a pé.",
    "circuit.pois": "PONTOS DE INTERESSE",
    "circuit.loading": "Carregando circuito...",
    "circuit.error": "Erro ao carregar circuito",

    // Navigation
    "nav.completed": "Circuito Concluído!",
    "nav.completedMessage": "Parabéns! Você completou todos os pontos de interesse deste circuito.",
    "nav.backHome": "Voltar ao início",
    "nav.stayHere": "Continuar aqui",
    "nav.notFound": "Circuito não encontrado",
    "nav.gettingLocation": "Obtendo localização...",
    "nav.youAreHere": "Você está aqui",
    "nav.noLocation": "Não é possível gerar indicações sem acesso à localização. Verifique as permissões do navegador.",
    "nav.poiUnavailable": "POI indisponível",
    "nav.arrivedAt": "Você chegou a: {name}",
    "nav.exploreInAR": "Explore em Realidade Aumentada",
    "nav.openInAR": "Abrir em RA",
    "nav.nextDestination": "Próximo destino: {name} · {distance} · {minutes} min",
    "nav.demoStart": "Iniciar Demo",
    "nav.demoStop": "Pausar Demo",
    "nav.poiCounter": "({current} de {total})",
    "nav.readyToFinish": "Percurso concluído",
    "nav.finishCircuit": "Finalizar",

    // Routing instructions (placeholders: {dist}, {street})
    "routing.continue": "Continue {dist} por {street}",
    "routing.turnRight": "Vire à direita e siga {dist} por {street}",
    "routing.turnLeft": "Vire à esquerda e siga {dist} por {street}",
    "routing.turnSharpRight": "Vire fortemente à direita e siga {dist} por {street}",
    "routing.turnSharpLeft": "Vire fortemente à esquerda e siga {dist} por {street}",
    "routing.turnSlightRight": "Vire levemente à direita e siga {dist} por {street}",
    "routing.turnSlightLeft": "Vire levemente à esquerda e siga {dist} por {street}",
    "routing.roundabout": "Pegue a rotatória e siga {dist} por {street}",
    "routing.head": "Siga {dist} por {street}",
    "routing.arrive": "Você chega a {street}",
    "routing.defaultStreet": "esta rua",

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
    "transport.walkShort": "A pé",
    "transport.carShort": "Carro",
    "transport.bikeShort": "Bike",

    // Recommendations
    "recommended.title": "RECOMENDADOS",
    "recommended.sunny": "Hoje está um dia ensolarado",
    "recommended.rainy": "Hoje está um dia chuvoso",
    "recommended.cloudy": "Hoje está um dia nublado",

    // AR (Realidade Aumentada)
    "ar.poi": "Ponto de Interesse",
    "ar.culturalInfo": "Informação Cultural",
    "ar.activateMotion": "Ativar sensor de movimento",
    "ar.activate": "Ativar",
    "ar.cameraPermissionError": "Você deve permitir o acesso à câmera para usar AR.",
    "ar.cameraError": "Não foi possível inicializar a câmera.",

    // Units
    "unit.km": "Quilômetros",
    "unit.miles": "Milhas",

    // Validations
    "validation.emailRequired": "O email é obrigatório",
    "validation.emailInvalid": "Formato de email inválido",
    "validation.passwordRequired": "A senha é obrigatória",
    "validation.passwordMin": "A senha deve ter pelo menos 8 caracteres",
    "validation.passwordUpper": "A senha deve conter pelo menos uma letra maiúscula",
    "validation.passwordLower": "A senha deve conter pelo menos uma letra minúscula",
    "validation.passwordNumber": "A senha deve conter pelo menos um número",
    "validation.passwordSpecial": "A senha deve conter pelo menos um caractere especial",
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("idioma");
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    if (mounted) {
      localStorage.setItem("idioma", lang);
    }
  };

  const t = (key, params = {}) => {
    let text = translations[language]?.[key] || key;

    Object.entries(params).forEach(([paramName, paramValue]) => {
      const placeholder = `{${paramName}}`;
      text = text.replace(placeholder, paramValue);
    });

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
