import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

import { courseParts } from "./types";

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
