import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import { createBlog } from "../redux/reducers/blogReducer";
import { setNotification } from "../redux/reducers/notificationReducer";

import { useField } from "../hooks";

const BlogForm = () => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    dispatch(createBlog(newBlog));
    dispatch(
      setNotification(
        `A new blog with title "${newBlog.title}" by author "${newBlog.author}" has been successfully added!`,
        "success",
        5
      )
    );

    const reset = { target: { value: "" } };
    title.onChange(reset);
    author.onChange(reset);
    url.onChange(reset);
  };

  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          <label>Title:</label>
          <input {...title} />
        </div>
        <div>
          <label>Author:</label>
          <input {...author} />
        </div>
        <div>
          <label>URL:</label>
          <input {...url} />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
