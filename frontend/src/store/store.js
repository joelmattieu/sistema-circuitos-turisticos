import { configureStore } from "@reduxjs/toolkit";
import paisesReducer from "./paises/paisesSlice";
import provinciasReducer from "./provincias/provinciasSlice";
import circuitosReducer from "./circuitos/circuitosSlice";
import idiomasReducer from "./idiomas/idiomasSlice";
import modosTransporteReducer from "./modosTransporte/modosTransporteSlice";
import unidadesMedicionReducer from "./unidadesMedicion/unidadesMedicionSlice";
import preferenciasReducer from "./preferencias/preferenciasSlice";

export const store = configureStore({
  reducer: {
    paises: paisesReducer,
    provincias: provinciasReducer,
    circuitos: circuitosReducer,
    idiomas: idiomasReducer,
    modosTransporte: modosTransporteReducer,
    unidadesMedicion: unidadesMedicionReducer,
    preferencias: preferenciasReducer,
  },
});

export default store;
