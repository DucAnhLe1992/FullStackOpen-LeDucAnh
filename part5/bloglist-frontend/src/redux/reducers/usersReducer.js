import { createSlice } from "@reduxjs/toolkit";
import usersService from "../../services/users";
import { userLogin } from "./loginReducer";

const usersReducer = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    getUsers(state, action) {
      return action.payload;
    },
    createUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers();
    dispatch(getUsers(users));
  };
};

export const createNewUser = (username, password, name) => {
  return async (dispatch) => {
    const createdUser = await usersService.register({
      username,
      password,
      name,
    });
    dispatch(createUser(createdUser));
  };
};

export const { getUsers, createUser } = usersReducer.actions;
export default usersReducer.reducer;
