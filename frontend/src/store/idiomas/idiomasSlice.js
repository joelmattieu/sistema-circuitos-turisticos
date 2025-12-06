import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { idiomasService } from "../../services/idiomas";

export const fetchIdiomas = createAsyncThunk(
  "idiomas/fetchIdiomas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await idiomasService.getAll();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const idiomasSlice = createSlice({
  name: "idiomas",
  initialState: {
    idiomas: [],
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
      .addCase(fetchIdiomas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIdiomas.fulfilled, (state, action) => {
        state.loading = false;
        state.idiomas = action.payload;
      })
      .addCase(fetchIdiomas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = idiomasSlice.actions;
export default idiomasSlice.reducer;
