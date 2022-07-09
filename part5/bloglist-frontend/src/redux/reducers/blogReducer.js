import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogs";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addNewBlog(state, action) {
      state.push(action.payload);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, blog);
    dispatch(updateBlog(blog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
  };
};

export const { addNewBlog, appendBlog, updateBlog, deleteBlog, setBlogs } =
  blogReducer.actions;
export default blogReducer.reducer;