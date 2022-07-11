import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);
  return (
    <div>
      <h3>List of blogs by you</h3>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => {
                if (blog.user.id === user.id) {
                  return (
                    <TableRow key={blog.id}>
                      <TableCell>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                      </TableCell>
                      <TableCell>{blog.user.name}</TableCell>
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

export default Blogs;
