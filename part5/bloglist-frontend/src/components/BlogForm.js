import React from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";

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
          <TextField {...title} label="Title" />
        </div>
        <div>
          <TextField {...author} label="Author" />
        </div>
        <div>
          <TextField {...url} label="URL" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
