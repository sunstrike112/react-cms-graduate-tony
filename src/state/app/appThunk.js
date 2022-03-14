import { createAsyncThunk } from "@reduxjs/toolkit";

import httpRequest from "services/httpRequest";

export const fetchTodos = createAsyncThunk(
  "/api/todo",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log("fetchTodos thunk: ", state);

    try {
      const res = await httpRequest.get("/api/todo", {
        showLoading: true,
      });
      return res.data;
    } catch (error) {
      console.log("fthunk error: ", error.response);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
