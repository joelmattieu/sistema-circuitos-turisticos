import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { unidadesMedicionService } from "../../services/unidadesMedicion";

export const fetchUnidadesMedicion = createAsyncThunk(
  "unidadesMedicion/fetchUnidadesMedicion",
  async (_, { rejectWithValue }) => {
    try {
      const response = await unidadesMedicionService.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const unidadesMedicionSlice = createSlice({
  name: "unidadesMedicion",
  initialState: {
    unidades: [],
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
      .addCase(fetchUnidadesMedicion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnidadesMedicion.fulfilled, (state, action) => {
        state.loading = false;
        state.unidades = action.payload;
      })
      .addCase(fetchUnidadesMedicion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = unidadesMedicionSlice.actions;
export default unidadesMedicionSlice.reducer;
