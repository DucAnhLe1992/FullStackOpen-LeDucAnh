import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: {
    message: "",
    time: 0,
  },
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return {
        message: "",
        time: 0,
      };
    },
  },
});

export const setNotification = (text, time) => {
  return (dispatch) => {
    dispatch(
      createNotification({
        message: text,
        time: time,
      })
    );
    setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export const { createNotification, removeNotification } =
  notificationReducer.actions;
export default notificationReducer.reducer;
