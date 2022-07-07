import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import "../index.css";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.message === "" || notification.time === 0) return null;

  return <div className={notification.type}>{notification.message}</div>;
};

export default Notification;
