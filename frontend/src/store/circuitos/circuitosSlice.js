import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { circuitosService } from "../../services/circuitos";

export const fetchCircuitos = createAsyncThunk(
  "circuitos/fetchCircuitos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await circuitosService.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  }
);

export const fetchCircuitoById = createAsyncThunk(
  "circuitos/fetchCircuitoById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await circuitosService.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  }
);

export const finalizarCircuito = createAsyncThunk(
  "circuitos/finalizarCircuito",
  async (id, { rejectWithValue }) => {
    try {
      const response = await circuitosService.finalizar(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  }
);

const circuitosSlice = createSlice({
  name: "circuitos",
  initialState: {
    circuitos: [],
    currentCircuito: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCircuito: (state) => {
      state.currentCircuito = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCircuitos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCircuitos.fulfilled, (state, action) => {
        state.loading = false;
        state.circuitos = action.payload;
      })
      .addCase(fetchCircuitos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCircuitoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCircuitoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCircuito = action.payload;
      })
      .addCase(fetchCircuitoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(finalizarCircuito.fulfilled, (state, action) => {
        state.currentCircuito = action.payload;
      });
  },
});

export const { clearError, clearCurrentCircuito } = circuitosSlice.actions;
export default circuitosSlice.reducer;
