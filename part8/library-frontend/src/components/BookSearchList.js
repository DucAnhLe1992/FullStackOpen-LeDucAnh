import { useQuery } from "@apollo/client";

import { BOOKS_BY_GENRE } from "../queries";

const BookSearchList = ({ genre }) => {
  const searchResults = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  });

  if (searchResults.loading) return <div>searching...</div>;

  const books = searchResults.data.allBooks;

  return (
    <div>
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
    </div>
  );
};

export default BookSearchList;
