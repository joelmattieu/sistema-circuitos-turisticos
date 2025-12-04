import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { postLogin } from "../services/login";
import { postRegister } from "../services/register";
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
      toast.success(
        "¡Usuario creado exitosamente!"
      );
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
