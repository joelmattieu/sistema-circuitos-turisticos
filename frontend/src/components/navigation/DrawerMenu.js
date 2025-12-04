"use client";
import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import AuthContext from "@/context/AuthContext";

const DrawerMenu = ({ open, onClose }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    onClose();
  };

  const menuItems = [
    {
      text: "Inicio",
      icon: <HomeIcon />,
      action: () => {
        onClose();
      },
    },
    {
      text: "Preferencias",
      icon: <SettingsIcon />,
      action: () => {
        onClose();
      },
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
      <Divider sx={{ backgroundColor: "#444" }} />

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
