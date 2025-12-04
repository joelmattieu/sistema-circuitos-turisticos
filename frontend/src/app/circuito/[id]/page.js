"use client";
import React from "react";
import { use } from "react";
import CircuitoDetalle from "@/views/CircuitoDetalle";

const CircuitoPage = ({ params }) => {
  const { id } = use(params);

  return <CircuitoDetalle circuitoId={id} />;
}

export default CircuitoPage;
