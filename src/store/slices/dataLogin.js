import { createSlice } from "@reduxjs/toolkit";

const dataLoginSlice = createSlice({
  name: "datos del Login",
  initialState: [],
  reducers: {
    setDataLogin: (state, action) => action.payload,
  },
});

export const { setDataLogin } = dataLoginSlice.actions;
export default dataLoginSlice.reducer;
