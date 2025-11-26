import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          backgroundColor: "primary.main",
        }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", px: 4 }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Avatar alt="Usuario" sx={{ width: 32, height: 32 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
