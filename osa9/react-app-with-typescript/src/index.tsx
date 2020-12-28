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
  data: Array<Course>;
}

const Content: React.FC<ContentProps> = (props) => {
  return <div>
          {props.data.map(course => <p key={course.name}>{course.name} {course.exerciseCount}</p>)}
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

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
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