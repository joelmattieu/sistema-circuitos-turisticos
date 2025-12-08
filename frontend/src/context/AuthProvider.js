"use client";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import { LanguageContext } from "./LanguageContext";
import { postLogin } from "../services/login";
import { postRegister } from "../services/register";
import preferenciasService from "../services/preferencias";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const loginStatus = localStorage.getItem("isLoggedIn");

    if (savedUser && loginStatus === "true") {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await postLogin(credentials);
      const userData = response.user || response;

      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");

      // cargar preferencias de idioma del usuario desde BD
      try {
        const preferencias = await preferenciasService.getByUsuarioId(
          userData.usuario_id
        );
        if (preferencias && preferencias.idioma_id) {
          const idiomaMap = {
            1: "es",
            2: "en",
            3: "pt",
          };
          const codigoIdioma = idiomaMap[preferencias.idioma_id] || "es";
          localStorage.setItem("idioma", codigoIdioma);
        }
      } catch (error) {
        console.log("No se pudieron cargar preferencias de idioma");
      }

      router.push("/");
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    router.push("/login/");
  };

  const register = async (userData) => {
    try {
      const response = await postRegister(userData);
      router.push("/login/");
      toast.success("¡Usuario creado exitosamente!");
      return response;
    } catch (error) {
      toast.error("Error al crear usuario");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, register, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
