import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const allUsersCall = createAsyncThunk(
  "allUsersCall",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/users/all", payload);
      console.log(res.data);
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

const allUserSlice = createSlice({
  name: "allUsers",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allUsersCall.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(allUsersCall.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload;
      state.error = false;
    });
    builder.addCase(allUsersCall.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.message = payload.data.message;
    });
  },
});

export const users = (state) => state.allUsers.users;
export const Userloading = (state) => state.allUsers.loading;
export default allUserSlice.reducer;
