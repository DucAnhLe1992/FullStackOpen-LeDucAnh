import React from "react";
import '../index.css'

const Notification = ({ notif }) => {
  return notif === null ? null : <div className={notif.type}>{notif.message}</div>;
};

export default Notification;
