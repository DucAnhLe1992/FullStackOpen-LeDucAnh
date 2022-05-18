import React from "react";
import "../index.css";
import PropTypes from "prop-types";

const Notification = ({ notif }) => {
  return notif === null ? null : (
    <div className={notif.type}>{notif.message}</div>
  );
};

Notification.propTypes = {
  notif: PropTypes.any.isRequired,
};

export default Notification;
