import React from "react";
import { useDispatch } from "react-redux";

import { userLogin } from "../redux/reducers/loginReducer";
import { setNotification } from "../redux/reducers/notificationReducer";
import { useField } from "../hooks";

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField("text");
  const password = useField("password");

  const handleLogin = (event) => {
    event.preventDefault();

    try {
      dispatch(userLogin(username.value, password.value));
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", "error", 5));
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div>
          Username: <input {...username} />
        </div>
        <div>
          Password: <input {...password} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
