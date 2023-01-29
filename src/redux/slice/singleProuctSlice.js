import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//create asyncThunk
export const singleProuctCall = createAsyncThunk(
  "singleProuctCall",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/products/${payload}`);
      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        return rejectWithValue(error.response);
      } else {
        throw error;
      }
    }
  }
);

const singleProuctSlice = createSlice({
  name: "singleProuct",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(singleProuctCall.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(singleProuctCall.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.product = payload;
    });
    builder.addCase(singleProuctCall.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload.data.message;
    });
  },
});

export const product = (state) => state.singleProuct.product;
export const loading = (state) => state.singleProuct.loading;
export const message = (state) => state.singleProuct.message;
export default singleProuctSlice.reducer;
