import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with ", username, password);

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({ message: "Wrong credentials", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
    setNotification({
      message: `A new blog with title "${newBlog.title}" by author "${newBlog.author}" has been successfully added!`,
      type: "success",
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const likeBlog = (blog) => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    blogService.update(blog.id.valueOf(), newBlog).then((returnedBlog) => {
      console.log(returnedBlog.id.valueOf())
      setBlogs(
        blogs.filter((blog) => blog.id.valueOf() !== returnedBlog.id.valueOf()).concat(returnedBlog)
      );

    });
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

      <Notification notif={notification} />
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
            {blogs.sort((a, b) => b.likes - a.likes).map((blog) => {
              if (blog.user.id === user.id) {
                return <Blog key={blog.id} blog={blog} toLikeBlog={likeBlog} />;
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
