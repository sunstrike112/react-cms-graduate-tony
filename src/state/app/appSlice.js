import { createSlice } from "@reduxjs/toolkit";

// thunk
import { fetchTodos } from "./appThunk";

const initialState = {
  isLoading: false,
  user: null,
  todos: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        console.log("extraReducers pending");
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        console.log("extraReducers fulfilled");
        state.todos = payload;
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        console.log("extraReducers rejected", payload);
      });
  },
});

export const { setLoading, setUser } = appSlice.actions;

export default appSlice.reducer;
