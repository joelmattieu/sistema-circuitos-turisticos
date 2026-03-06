"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Box, Toolbar } from "@mui/material";
import Header from "@/components/navigation/Header";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const noLayoutRoutes = ["/login/", "/register/"];
  const showLayout = !noLayoutRoutes.includes(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  if (showLayout) {
    return (
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Header />
          <Toolbar />
          {children}
        </Box>
      </Box>
    );
  }

  return <>{children}</>;
};

export default Layout;
