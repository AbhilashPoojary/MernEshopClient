import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const adminFilterSlice = createSlice({
  name: "filterAdmin",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products?.filter(
        (product) =>
          product?.name?.toLowerCase().includes(search?.toLowerCase()) ||
          product?.category?.toLowerCase().includes(search?.toLowerCase())
      );
      console.log({
        products,
        search,
        tempProducts,
      });
      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_BY_SEARCH } = adminFilterSlice.actions;

export const adminProducts = (state) => state.adminfilter.filteredProducts;

export default adminFilterSlice.reducer;
