import { CoursePart } from "../types";

interface totalProps {
  courses: CoursePart[];
}

const Total = ({ courses }: totalProps) => {
  return (
    <div>
      Number of exercises{" "}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  );
};

export default Total;
