import { createSlice } from "@reduxjs/toolkit";
import loginService from "../../services/login";

const loginReducer = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    login(state, action) {},
    logout(state, action) {},
  },
});

export const { login, logout } = loginReducer.actions;
export default loginReducer.reducer;
