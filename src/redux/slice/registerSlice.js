import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//create async thunk
export const registerCall = createAsyncThunk(
  "registerCall",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/reqister", payload);
      return res.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      } else {
        throw error;
      }
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: "",
};

const registerSlice = createSlice({
  name: "regiser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerCall.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerCall.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = "";
      window.location = "/login";
    });
    builder.addCase(registerCall.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.message = payload.data.message;
    });
  },
});

export const loading = (state) => state.register.loading;
export const message = (state) => state.register.message;
export default registerSlice.reducer;
