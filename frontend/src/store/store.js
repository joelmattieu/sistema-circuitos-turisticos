import { configureStore } from "@reduxjs/toolkit";
import paisesReducer from "./paises/paisesSlice";
import provinciasReducer from "./provincias/provinciasSlice";
import circuitosReducer from "./circuitos/circuitosSlice";

export const store = configureStore({
  reducer: {
    paises: paisesReducer,
    provincias: provinciasReducer,
    circuitos: circuitosReducer,
  },
});

export default store;
