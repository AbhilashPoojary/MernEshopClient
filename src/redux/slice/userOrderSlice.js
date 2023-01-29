import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userOrderCall = createAsyncThunk(
  "userOrderCall",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/order/userorder", payload);
      console.log(payload);
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

export const userOrderSlice = createSlice({
  name: "userOrder",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(userOrderCall.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userOrderCall.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.orders = payload;
      state.isReady = true;
    });
    builder.addCase(userOrderCall.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.isReady = false;
      state.message = payload.data.message;
    });
  },
});

export const userOrders = (state) => state.userOrders.orders;
export const OrderLoading = (state) => state.userOrders.loading;
export const isReady = (state) => state.userOrders.isReady;
export default userOrderSlice.reducer;
