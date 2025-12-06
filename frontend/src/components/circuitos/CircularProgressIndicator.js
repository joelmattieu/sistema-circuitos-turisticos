"use client";
import React from "react";
import { Box } from "@mui/material";

const CircularProgressIndicator = ({ percentage = 0 }) => {
  const radius = 16;
  const strokeWidth = 2.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Box
      sx={{
        width: 36,
        height: 36,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="36" height="36" style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx="18"
          cy="18"
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="18"
          cy="18"
          r={radius}
          stroke="#FB8C00"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>
    </Box>
  );
};

export default CircularProgressIndicator;