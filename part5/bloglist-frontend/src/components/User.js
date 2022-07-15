import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const User = () => {
  const userId = useParams("/users/:id");
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === userId.id);

  return (
    <div>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => {
              if (blog.user.id === userId.id) {
                return (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                    <TableCell>
                      {blog.likes} {blog.likes > 1 ? "likes" : "like"}
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;
