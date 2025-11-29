import { configureStore } from "@reduxjs/toolkit";
import paisesReducer from "./paises/paisesSlice";
import provinciasReducer from "./provincias/provinciasSlice";

export const store = configureStore({
  reducer: {
    paises: paisesReducer,
    provincias: provinciasReducer,
  },
});

export default store;
