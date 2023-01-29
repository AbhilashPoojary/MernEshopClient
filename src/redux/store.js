import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import filterReducer from "./slice/filterSlice";
import productReducer from "./slice/productSlice";
import cartReducer from "./slice/cartSlice";
import authSlice from "./slice/authSlice";
import registerSlice from "./slice/registerSlice";
import allProductSlice from "./slice/allProductSlice";
import singleProuctSlice from "./slice/singleProuctSlice";
import allOrderSlice from "./slice/orderSlice";
import userOrderSlice from "./slice/userOrderSlice";
import adminFilterSlice from "./slice/adminFilterSlice";
import allUserSlice from "./slice/allUserSlice";

const rootReducer = combineReducers({
  filter: filterReducer,
  product: productReducer,
  cart: cartReducer,
  login: authSlice,
  register: registerSlice,
  allproducts: allProductSlice,
  singleProuct: singleProuctSlice,
  allOrders: allOrderSlice,
  userOrders: userOrderSlice,
  adminfilter: adminFilterSlice,
  allUsers: allUserSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
