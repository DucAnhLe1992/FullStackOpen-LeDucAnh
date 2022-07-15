import { createSlice } from "@reduxjs/toolkit";
import commentService from "../../services/comments";

const commentReducer = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    appendComment(state, action) {
      state.push(action.payload);
    },
    setComments(state, action) {
      return action.payload;
    },
  },
});

export const postAComment = (blogId, comment) => {
  return async (dispatch) => {
    const newComment = await commentService.postAComment(blogId, comment);
    dispatch(appendComment(newComment));
  };
};

export const getAllComments = (blogId) => {
  return async (dispatch) => {
    const allComments = await commentService.getAllComments(blogId);
    dispatch(setComments(allComments));
  };
};

export const { appendComment, setComments } = commentReducer.actions;
export default commentReducer.reducer;
