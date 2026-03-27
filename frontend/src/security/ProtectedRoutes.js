"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoutes = ({ children, redirectIfLoggedIn = false }) => {
  const router = useRouter();
  const isClient = typeof window !== "undefined";

  const loggedIn = isClient && localStorage.getItem("isLoggedIn") === "true";
  const goHome = redirectIfLoggedIn && loggedIn;
  const goLogin = !redirectIfLoggedIn && !loggedIn;

  useEffect(() => {
    if (goHome) {
      router.replace("/");
      return;
    }
    if (goLogin) {
      router.replace("/login/");
    }
  }, [router, goHome, goLogin]);

  if (!isClient) return null;
  if (goHome || goLogin) return null;

  return <>{children}</>;
};

export default ProtectedRoutes;
