import React from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";

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
          <TextField {...username} label="Username" />
        </div>
        <div>
          <TextField {...password} label="Password" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
