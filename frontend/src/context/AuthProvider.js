"use client";
import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { postLogin } from "../services/login";
import { postRegister } from "../services/register";
import { preferenciasService } from "../services/preferencias";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const isLoggedIn = !!token;

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const IDIOMA_POR_ID = { 1: "es", 2: "en", 3: "pt" };

  const login = async (credentials) => {
    const response = await postLogin(credentials);
    const { access_token, user: userData } = response;

    setToken(access_token);
    setUser(userData);
    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(userData));

    try {
      const preferencias = await preferenciasService.getMe();
      if (preferencias?.idioma_id) {
        localStorage.setItem("idioma", IDIOMA_POR_ID[preferencias.idioma_id] || "es");
      }
    } catch {
      // si no hay preferencias guardadas, queda el idioma actual
    }

    router.push("/");
    return response;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
      value={{ isLoggedIn, user, token, login, logout, register, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
