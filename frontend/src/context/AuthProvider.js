import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { postLogin } from "../services/login";
import { postRegister } from "../services/register";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const loggedInStatus = localStorage.getItem("isLoggedIn");

    if (savedUser && loggedInStatus === "true") {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const userData = await postLogin(credentials);
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      toast.success("¡Bienvenido!");
      router.push("/");
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const register = async (userData) => {
    try {
      const response = await postRegister(userData);
      if (response) {
        router.push("/login");
        toast.success("¡Usuario creado exitosamente!");
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
