import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { preferenciasService } from "../../services/preferencias";

export const fetchPreferenciasByUsuario = createAsyncThunk(
  "preferencias/fetchByUsuario",
  async (usuarioId, { rejectWithValue }) => {
    try {
      const response = await preferenciasService.getByUsuarioId(usuarioId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePreferencias = createAsyncThunk(
  "preferencias/update",
  async (preferenciaData, { rejectWithValue }) => {
    try {
      const response = await preferenciasService.createOrUpdate(
        preferenciaData
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const preferenciasSlice = createSlice({
  name: "preferencias",
  initialState: {
    preferencias: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setPreferencias: (state, action) => {
      state.preferencias = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPreferenciasByUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreferenciasByUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.preferencias = action.payload;
      })
      .addCase(fetchPreferenciasByUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePreferencias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePreferencias.fulfilled, (state, action) => {
        state.loading = false;
        state.preferencias = action.payload;
      })
      .addCase(updatePreferencias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setPreferencias } = preferenciasSlice.actions;
export default preferenciasSlice.reducer;
