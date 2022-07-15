import React from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";

import { createNewUser } from "../redux/reducers/usersReducer";
import { setNotification } from "../redux/reducers/notificationReducer";
import { useField } from "../hooks";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const username = useField("text");
  const password = useField("password");
  const name = useField("text");

  const handleRegister = (event) => {
    event.preventDefault();

    try {
      dispatch(createNewUser(username.value, password.value, name.value));
    } catch (exception) {
      dispatch(setNotification("Cannot register new user", "error", 5));
    }
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <div>
          <TextField {...username} label="Username" />
        </div>
        <div>
          <TextField {...password} label="Password" />
        </div>
        <div>
          <TextField {...name} label="Name" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
