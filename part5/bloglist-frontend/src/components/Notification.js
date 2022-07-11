import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

import "../index.css";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.message === "" || notification.time === 0) return null;

  return <Alert severity={notification.type}>{notification.message}</Alert>;
};

export default Notification;
