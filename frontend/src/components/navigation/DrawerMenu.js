"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import AuthContext from "@/context/AuthContext";

const DrawerMenu = ({ open, onClose }) => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleInicioClick = () => {
    router.push("/");
    onClose();
  };

  const handlePreferenciasClick = () => {
    router.push("/preferencias/");
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const menuItems = [
    {
      text: "Inicio",
      icon: <HomeIcon />,
      action: handleInicioClick,
    },
    {
      text: "Preferencias",
      icon: <SettingsIcon />,
      action: handlePreferenciasClick,
    },
    {
      text: "Cerrar sesión",
      icon: <ExitToAppIcon />,
      action: handleLogout,
    },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          backgroundColor: "#2c2c2cec",
          color: "white",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={item.action}
              sx={{
                py: 1.5,
                px: 3,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: "white",
                    fontSize: "0.95rem",
                    fontWeight: 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
