import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: {
    message: "",
    isVisible: false,
  },
  reducers: {
    createNotification(state, action) {
      const message = action.payload;
      return {
        message: message,
        isVisible: true,
      };
    },
    removeNotification(state, action) {
      return {
        message: action.payload.message,
        isVisible: false,
      };
    },
  },
});

export const { createNotification, removeNotification } = notificationReducer.actions;
export default notificationReducer.reducer;
