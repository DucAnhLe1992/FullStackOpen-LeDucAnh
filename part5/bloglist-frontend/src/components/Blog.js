import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, toLikeBlog }) => {
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

  const likeBlog = (event) => {
    event.preventDefault();
    toLikeBlog(blog);
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
          <button onClick={likeBlog}>like</button>
        </div>
        <div>
          <button>remove this post</button>
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
  toLikeBlog: PropTypes.func.isRequired,
};

export default Blog;
