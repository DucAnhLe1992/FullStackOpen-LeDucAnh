import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const notificationVisible = notification.isVisible;

  return (
    <div>
      <h2>Anecdotes</h2>
      {notificationVisible ? <Notification /> : ""}
      {notificationVisible &&
        setTimeout(() => {
          dispatch({
            type: "notification/removeNotification",
            payload: {
              message: notification.message,
            },
          });
        }, 5000)}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
