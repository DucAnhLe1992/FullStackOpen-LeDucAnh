import { useState } from "react";
import { useQuery } from "@apollo/client";

import BookSearchList from "./BookSearchList";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState(null);
  const allResults = useQuery(ALL_BOOKS);

  if (allResults.loading) {
    return <div>loading books...</div>;
  }

  if (!props.show) {
    return null;
  }

  const books = allResults.data.allBooks;

  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        setGenres(genres.concat(genre));
      }
    });
  });

  if (genre !== null) {
    return (
      <div>
        <h2>books</h2>
        <p>
          books searched by genre <b>{genre}</b>
        </p>
        <BookSearchList genre={genre} />
        <div>
          <p></p>
          {genres.map((genre) => (
            <button key={genre} onClick={() => setGenre(genre)}>
              {genre}
            </button>
          ))}
        </div>
        <div>
          <button onClick={() => setGenre(null)}>clear search</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>all books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p></p>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
