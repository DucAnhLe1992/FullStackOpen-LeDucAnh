import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const User = () => {
  const userId = useParams("/users/:id");
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === userId.id);

  return (
    <div>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {blogs.map((blog) => {
          if (blog.user.id === userId.id) {
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

export default User;
