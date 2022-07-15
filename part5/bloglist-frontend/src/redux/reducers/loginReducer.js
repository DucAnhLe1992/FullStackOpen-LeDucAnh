import { createSlice } from "@reduxjs/toolkit";
import loginService from "../../services/login";
import blogService from "../../services/blogs";

const loginReducer = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return null;
    },
  },
});

export const userLogin = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    blogService.setToken(user.token);
    dispatch(login(user));
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    blogService.setToken(null);
    dispatch(logout());
  };
};

export const { login, logout } = loginReducer.actions;
export default loginReducer.reducer;
