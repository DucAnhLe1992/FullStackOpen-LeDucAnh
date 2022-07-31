import { useState } from "react";
import {
  useApolloClient,
  useSubscription,
} from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import ChangeBirthyear from "./components/ChangeBirthyear";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqueByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("change")}>change birthyear</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={notify} />
      <ChangeBirthyear show={page === "change"} setError={notify} />
      <Recommend show={page === "recommend"} />
      <Login
        show={page === "login"}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
