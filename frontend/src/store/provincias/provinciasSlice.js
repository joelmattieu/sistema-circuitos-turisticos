import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { provinciasService } from "../../services/provincias";

export const fetchProvincias = createAsyncThunk(
  "provincias/fetchProvincias",
  async (_, { rejectWithValue }) => {
    try {
      const response = await provinciasService.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProvinciaById = createAsyncThunk(
  "provincias/fetchProvinciaById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await provinciasService.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProvinciasByPais = createAsyncThunk(
  "provincias/fetchProvinciasByPais",
  async (paisId, { rejectWithValue }) => {
    try {
      const response = await provinciasService.getByPais(paisId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const provinciasSlice = createSlice({
  name: "provincias",
  initialState: {
    provincias: [],
    provinciasFiltradas: [],
    currentProvincia: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProvincia: (state) => {
      state.currentProvincia = null;
    },
    clearFilteredProvincias: (state) => {
      state.provinciasFiltradas = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todas las provincias
      .addCase(fetchProvincias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvincias.fulfilled, (state, action) => {
        state.loading = false;
        state.provincias = action.payload;
      })
      .addCase(fetchProvincias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch provincia por ID
      .addCase(fetchProvinciaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvinciaById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProvincia = action.payload;
      })
      .addCase(fetchProvinciaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch provincias por país
      .addCase(fetchProvinciasByPais.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvinciasByPais.fulfilled, (state, action) => {
        state.loading = false;
        state.provinciasFiltradas = action.payload;
      })
      .addCase(fetchProvinciasByPais.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentProvincia, clearFilteredProvincias } =
  provinciasSlice.actions;

export default provinciasSlice.reducer;
