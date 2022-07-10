import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);
  return (
    <div>
      <h3>List of blogs by you</h3>
      <ul>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            if (blog.user.id === user.id) {
              return (
                <li key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default Blogs;
