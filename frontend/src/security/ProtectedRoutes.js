"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const ProtectedRoutes = ({ children, redirectIfLoggedIn = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Cargando...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
