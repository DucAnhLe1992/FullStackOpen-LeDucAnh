import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: {
    message: "",
    type: "",
    time: 0,
  },
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return {
        message: "",
        type: "",
        time: 0,
      };
    },
  },
});

export const setNotification = (message, type, time) => {
  return (dispatch) => {
    dispatch(
      createNotification({
        message,
        type,
        time,
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
