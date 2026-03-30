"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";

const ProtectedRoutes = ({ children, redirectIfLoggedIn = false }) => {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  const goHome = !isLoading && redirectIfLoggedIn && isLoggedIn;
  const goLogin = !isLoading && !redirectIfLoggedIn && !isLoggedIn;

  useEffect(() => {
    if (goHome) {
      router.replace("/");
      return;
    }
    if (goLogin) {
      router.replace("/login/");
    }
  }, [router, goHome, goLogin]);

  if (isLoading) return null;
  if (goHome || goLogin) return null;

  return <>{children}</>;
};

export default ProtectedRoutes;
