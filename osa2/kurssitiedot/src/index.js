import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  console.log("Header - props:")
  console.log(props)
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  //console.log("Content - props:")
  //console.log(props)
  //console.log(props.parts[1])
  //const result = props.parts.map(part => part.name)
  //console.log(result)
  return (
    
    <div>
      {props.parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}



const Part = (props) => {
  //console.log("Part - props:")
  //console.log(props)
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Course = (props) => {
  //const { course } = props.course
  
  return(
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
    </div>

  )
  
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'State of a component II',
        exercises: 19,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

  


ReactDOM.render(<App />, document.getElementById('root'))