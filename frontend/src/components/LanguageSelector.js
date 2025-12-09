"use client";
import React, { useState, useContext } from "react";
import { IconButton, Menu, MenuItem, Box } from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { LanguageContext } from "../context/LanguageContext";

const LanguageSelector = ({ position = "absolute", top = 20, right = 20 }) => {
  const { changeLanguage } = useContext(LanguageContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = (idioma) => {
    if (idioma) {
      changeLanguage(idioma);
    }
    setAnchorEl(null);
  };

  return (
    <Box sx={{ position, top, right }}>
      <IconButton
        onClick={handleLanguageClick}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          },
        }}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleLanguageClose(null)}
      >
        <MenuItem onClick={() => handleLanguageClose("es")}>
          🇦🇷 Español
        </MenuItem>
        <MenuItem onClick={() => handleLanguageClose("en")}>
          🇺🇸 English
        </MenuItem>
        <MenuItem onClick={() => handleLanguageClose("pt")}>
          🇧🇷 Português
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
