import React from "react";
import { useDispatch } from "react-redux";

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
          Username: <input {...username} />
        </div>
        <div>
          Password: <input {...password} />
        </div>
        <div>
          Name: <input {...name} />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
