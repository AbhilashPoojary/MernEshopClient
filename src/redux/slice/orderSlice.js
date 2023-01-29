import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//add order
export const addOrderCall = createAsyncThunk(
  "addOrderCall",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/order/create", payload);
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

//all orders
export const allOrderCall = createAsyncThunk(
  "allOrderCall",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/order/all", payload);
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

export const allOrderSlice = createSlice({
  name: "allOrders",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(allOrderCall.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(allOrderCall.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.orders = payload;
    });
    builder.addCase(allOrderCall.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload.data.message;
    });
    builder.addCase(addOrderCall.pending, (state, action) => {
      state.loading = true;
      state.isReady = false;
    });
    builder.addCase(addOrderCall.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.isReady = true;
    });
    builder.addCase(addOrderCall.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload.data.message;
      state.isReady = false;
    });
  },
});

export const orders = (state) => state.allOrders.orders;
export const loading = (state) => state.allOrders.loading;
export const isReady = (state) => state.allOrders.isReady;
export default allOrderSlice.reducer;
