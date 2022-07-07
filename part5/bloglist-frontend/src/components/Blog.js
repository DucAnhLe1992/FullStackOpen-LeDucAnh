import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { likeBlog, removeBlog } from "../redux/reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const likeABlog = (event) => {
    event.preventDefault();
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(newBlog));
  };

  const removeABlog = (event) => {
    event.preventDefault();
    dispatch(removeBlog(blog.id));
  };

  return (
    <div className="blog" style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>{blog.title}</div>
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible}>
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes
          <button onClick={likeABlog}>like</button>
        </div>
        <div>
          <button onClick={removeABlog}>remove this post</button>
        </div>
        <div>
          <button onClick={toggleVisibility}>hide</button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.any.isRequired,
};

export default Blog;
