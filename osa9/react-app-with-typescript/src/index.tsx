import React from "react";
import ReactDOM from "react-dom";

interface Course {
  name: string;
  exerciseCount: number;

}

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.name}</h1>;
}

interface ContentProps {
  data: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = (props) => {
  return <div>
          {/* {props.data.map(
            course => 
            <p key={course.name}>{course.name} {course.exerciseCount}</p>)
            } */}
          {props.data.map(
            course => 
              <Part key={course.name} {...course} />)
          }
        </div>;
        
}

interface TotalProps {
  data: Array<Course>;
}

const Total: React.FC<TotalProps> = (props) => {
  return  <p>
      Number of exercises{" "}
      {props.data.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDesc extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDesc {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDesc {
  name: "TypeScript using types";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const Part: React.FC<CoursePart> = (props) => {
  console.log(props);
  switch (props.name) {
    case "Fundamentals":
      return <div>{props.name}, <b>excersises:</b> {props.exerciseCount}, <b>description:</b> {props.description}</div>;
      break;
    case "Using props to pass data":
      return <div>{props.name}, <b>excersises:</b>  {props.exerciseCount}, <b>groupProjectCount:</b> {props.groupProjectCount}</div>;
    case "Deeper type usage":
      return <div>{props.name}, <b>excersises:</b>  {props.exerciseCount}, <b>description:</b> {props.description}, <b>exerciseSubmissionLink:</b> {props.exerciseSubmissionLink}</div>;
    case "TypeScript using types":
      return <div>{props.name}, <b>excersises:</b>  {props.exerciseCount}, <b>description:</b>  {props.description}</div>;
    default:
      return assertNever(props);
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "TypeScript using types",
      exerciseCount: 101,
      description: "This is the 9th part"
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content data={courseParts} />
      <Total data={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));