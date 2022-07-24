import { CoursePart } from "../types";
import Part from "./Part";

interface contentProps {
  courses: CoursePart[];
}

const Content = ({ courses }: contentProps) => {
  return (
    <div>
      {courses.map((course) => (
        <Part key={course.name} course={course} />
      ))}
    </div>
  );
};

export default Content;
