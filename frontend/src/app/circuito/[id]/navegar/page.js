"use client";
import React from "react";
import { use } from "react";
import CircuitoNavegacion from "@/views/CircuitoNavegacion";

const CircuitoNavegacionPage = ({ params }) => {
  const { id } = use(params);

  return <CircuitoNavegacion circuitoId={id} />;
};

export default CircuitoNavegacionPage;
