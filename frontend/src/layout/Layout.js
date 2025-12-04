"use client";
import { usePathname } from "next/navigation";
import { Box, Toolbar } from "@mui/material";
import Header from "@/components/navigation/Header";

const Layout = ({ children }) => {
  const pathname = usePathname();

  const noLayoutRoutes = ["/login/", "/register/"];

  const showLayout = !noLayoutRoutes.includes(pathname);

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
