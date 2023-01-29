import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const cartIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (cartIndex >= 0) {
        state.cartItems[cartIndex].cartQuantity += 1;
      } else {
        const tempCartItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempCartItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_FROM_CART(state, action) {
      const cartIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      const getIndexItem = state.cartItems[cartIndex];
      if (getIndexItem.cartQuantity >= 1) {
        getIndexItem.cartQuantity -= 1;
      }
      if (getIndexItem.cartQuantity === 0) {
        const tempItem = state.cartItems.filter(
          (item) => item._id !== getIndexItem._id
        );
        state.cartItems = tempItem;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DELETE_FROM_CART(state, action) {
      const tempItem = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = tempItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    EMPTY_CART(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    TOTAL_CART_ITEMS(state) {
      const tempTotalItems = state.cartItems
        .map((item) => item.cartQuantity)
        .reduce((acc, cur) => acc + cur, 0);
      state.cartTotalQuantity = tempTotalItems;
    },
    TOTAL_CART_VALUE(state) {
      const tempTotalAmout = state.cartItems
        .map((item) => item.cartQuantity * item.price)
        .reduce((acc, cur) => acc + cur, 0);
      state.cartTotalAmount = tempTotalAmout;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_FROM_CART,
  DELETE_FROM_CART,
  EMPTY_CART,
  TOTAL_CART_ITEMS,
  TOTAL_CART_VALUE,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
