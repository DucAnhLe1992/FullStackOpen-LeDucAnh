import { useQuery } from "@apollo/client";
import BookSearchList from "./BookSearchList";
import { MY_ACCOUNT } from "../queries";

const Recommend = ({ show }) => {
  const result = useQuery(MY_ACCOUNT);

  if (result.loading) {
    return <div>loading recommendations...</div>;
  }
  if (!show) {
    return null;
  }

  const genre = result.data.me.favGenre;

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <b>{genre}</b>
      </p>
      <BookSearchList genre={genre} />
    </div>
  );
};

export default Recommend;
