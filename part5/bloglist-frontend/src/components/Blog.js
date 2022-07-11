import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, List, ListItem, ListItemText, ListItemButton } from "@mui/material";

import { likeBlog, removeBlog } from "../redux/reducers/blogReducer";
import { getAllComments, postAComment } from "../redux/reducers/commentReducer";
import { useField } from "../hooks";

const Blog = () => {
  const comment = useField("text");
  const dispatch = useDispatch();
  const blogId = useParams("/blogs/:id");

  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  const comments = useSelector((state) => state.comments);

  const blog = blogs.find((blog) => blog.id === blogId.id);
  const user = users.find((user) => user.id === blog.user.id);

  useEffect(() => {
    dispatch(getAllComments(blogId.id));
  }, [dispatch]);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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

  const postComment = (event) => {
    event.preventDefault();
    dispatch(postAComment(blogId.id, { content: comment.value }));
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <h3>{blog.title}</h3>
        <div>{blog.author}</div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          <button onClick={likeABlog}>like</button>
        </div>
        <div>Added by {user.name}</div>
        <div>
          <button onClick={removeABlog}>remove this post</button>
        </div>
      </div>
      <div>
        <h4>Comments</h4>
        <form onSubmit={postComment}>
          <input {...comment} />
          <button type="submit">Add a comment</button>
        </form>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
