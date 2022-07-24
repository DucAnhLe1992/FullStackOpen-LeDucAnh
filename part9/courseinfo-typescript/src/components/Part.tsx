import { CoursePart } from "../types";

interface partProps {
  course: CoursePart;
}

const Part = ({ course }: partProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  {
    switch (course.type) {
      case "normal":
        return (
          <div>
            <p>Name: {course.name}</p>
            <p>Exercises: {course.exerciseCount}</p>
            <p>Description: {course.description}</p>
          </div>
        );

      case "groupProject":
        return (
          <div>
            <p>Name: {course.name}</p>
            <p>Exercises: {course.exerciseCount}</p>
            <p>Group projects: {course.groupProjectCount}</p>
          </div>
        );

      case "submission":
        return (
          <div>
            <p>Name: {course.name}</p>
            <p>Exercises: {course.exerciseCount}</p>
            <p>Description: {course.description}</p>
            <p>
              Link:{" "}
              <a href={course.exerciseSubmissionLink}>
                {course.exerciseSubmissionLink}
              </a>
            </p>
          </div>
        );

      case "special":
        return (
          <div>
            <p>Name: {course.name}</p>
            <p>Exercises: {course.exerciseCount}</p>
            <p>Description: {course.description}</p>
            <p>Required skills: {course.requirements.join(", ")}</p>
          </div>
        );

      default:
        return assertNever(course);
    }
  }
};

export default Part;
