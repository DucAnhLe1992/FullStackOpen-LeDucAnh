import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    blogService.create(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
    setNotification({
      message: `A new blog with title "${newBlog.title}" by author "${newBlog.author}" has been successfully added!`,
      type: "success",
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
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

  const blogForm = () => (
    <div>
      <div>
        Welcome back, {user.username}
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <form onSubmit={addBlog}>
        <div>
          Title:{" "}
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:{" "}
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:{" "}
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
        <div>
          {blogs.map((blog) => {
            if (blog.user.id === user.id)
              return <Blog key={blog.id} blog={blog} />;
          })}
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <h2>Blogs</h2>

      <Notification notif={notification} />
      {user === null ? loginForm() : blogForm()}
    </div>
  );
};

export default App;
