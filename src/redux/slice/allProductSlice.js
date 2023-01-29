import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//create asyncThunk
export const allProductCall = createAsyncThunk(
  "allProductCall",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/products/");
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

//add product
export const addProductCall = createAsyncThunk(
  "addProductCall",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/products/new", payload);
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

export const deleteProductCall = createAsyncThunk(
  "deleteProductCall",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const res = await axios.post("/api/products/delete", payload);
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

export const editProductCall = createAsyncThunk(
  "editProductCall",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/products/update", payload);
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

const allProductSlice = createSlice({
  name: "allProducts",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allProductCall.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(allProductCall.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.products = payload;
    });
    builder.addCase(allProductCall.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload.data.message;
    });
    builder.addCase(addProductCall.pending, (state, action) => {
      state.loading = true;
      state.isReady = false;
    });
    builder.addCase(addProductCall.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.products = payload;
      state.delete = false;
      state.isReady = true;
    });
    builder.addCase(addProductCall.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload.data.message;
      state.isReady = false;
    });
    builder.addCase(deleteProductCall.pending, (state, action) => {
      state.loading = true;
      state.isReady = false;
    });
    builder.addCase(deleteProductCall.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.isReady = true;
    });
    builder.addCase(deleteProductCall.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload.data.message;
      state.isReady = false;
    });

    builder.addCase(editProductCall.pending, (state, action) => {
      state.loading = true;
      state.isReady = false;
    });
    builder.addCase(editProductCall.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.isReady = true;
    });
    builder.addCase(editProductCall.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = payload.data.message;
      state.isReady = false;
    });
  },
});

export const products = (state) => state.allproducts.products;
export const success = (state) => state.allproducts.success;
export const loading = (state) => state.allproducts.loading;
export const message = (state) => state.allproducts.message;
export const isReady = (state) => state.allproducts.isReady;
export default allProductSlice.reducer;
