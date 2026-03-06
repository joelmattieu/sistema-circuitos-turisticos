"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const ProtectedRoutes = ({ children, redirectIfLoggedIn = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (redirectIfLoggedIn && loggedIn) {
      router.push("/");
    }
    else if (!redirectIfLoggedIn && !loggedIn) {
      router.push("/login/");
    } else {
      setIsLoading(false);
    }
  }, [router, redirectIfLoggedIn, pathname]);

  // Retornar null hasta montar - evita errores de hidratación
  if (!mounted || isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
