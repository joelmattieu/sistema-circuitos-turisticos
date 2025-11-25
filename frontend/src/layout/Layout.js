import { Box, Toolbar } from "@mui/material";
import Header from "@/components/Header";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
