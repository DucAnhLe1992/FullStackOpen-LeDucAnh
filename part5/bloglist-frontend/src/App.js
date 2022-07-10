import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Menu from "./components/Menu";
import Users from "./components/Users";
import User from "./components/User";

import { initializeBlogs } from "./redux/reducers/blogReducer";
import { userLogout } from "./redux/reducers/loginReducer";
import { getAllUsers } from "./redux/reducers/usersReducer";

const App = () => {
  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  return (
    <div>
      <Menu />
      <h2>Blogs</h2>
      <Notification />

      {user === null ? (
        <div>
          <LoginForm />
          <RegisterForm />
        </div>
      ) : (
        <div>
          <div>
            Welcome back, {user.username}
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <Togglable
                  buttonOpen="New blog"
                  buttonClose="Cancel"
                  ref={blogFormRef}
                >
                  <BlogForm />
                </Togglable>
              }
            />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
