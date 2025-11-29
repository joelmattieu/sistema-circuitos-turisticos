import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { paisesService } from "../../services/paises";

export const fetchPaises = createAsyncThunk(
  "paises/fetchPaises",
  async (_, { rejectWithValue }) => {
    try {
      const response = await paisesService.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPaisById = createAsyncThunk(
  "paises/fetchPaisById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await paisesService.getById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const paisesSlice = createSlice({
  name: "paises",
  initialState: {
    paises: [],
    currentPais: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPais: (state) => {
      state.currentPais = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaises.fulfilled, (state, action) => {
        state.loading = false;
        state.paises = action.payload;
      })
      .addCase(fetchPaises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPaisById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaisById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPais = action.payload;
      })
      .addCase(fetchPaisById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentPais } = paisesSlice.actions;
export default paisesSlice.reducer;
