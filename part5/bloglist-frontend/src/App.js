import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { setNotification } from "./redux/reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./redux/reducers/blogReducer";
import { userLogin, userLogout } from "./redux/reducers/loginReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log("logging in with ", username, password);

    try {
      dispatch(userLogin(username, password));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", "error", 5));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(newBlog));
    dispatch(
      setNotification(
        `A new blog with title "${newBlog.title}" by author "${newBlog.author}" has been successfully added!`,
        "success",
        5
      )
    );
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );

  return (
    <div>
      <h2>Blogs</h2>

      <Notification />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            Welcome back, {user.username}
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <Togglable
            buttonOpen="New blog"
            buttonClose="Cancel"
            ref={blogFormRef}
          >
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <div>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => {
                if (blog.user.id === user.id) {
                  return <Blog key={blog.id} blog={blog} />;
                }
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
