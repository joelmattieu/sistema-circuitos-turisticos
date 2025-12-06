import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { modosTransporteService } from "../../services/modosTransporte";

export const fetchModosTransporte = createAsyncThunk(
  "modosTransporte/fetchModosTransporte",
  async (_, { rejectWithValue }) => {
    try {
      const response = await modosTransporteService.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const modosTransporteSlice = createSlice({
  name: "modosTransporte",
  initialState: {
    modos: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModosTransporte.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModosTransporte.fulfilled, (state, action) => {
        state.loading = false;
        state.modos = action.payload;
      })
      .addCase(fetchModosTransporte.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = modosTransporteSlice.actions;
export default modosTransporteSlice.reducer;
