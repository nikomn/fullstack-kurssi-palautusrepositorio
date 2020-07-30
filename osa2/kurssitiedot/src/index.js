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
      <Total parts={props.course.parts} />
    </div>

  )
  
}

const Total = (props) => {
  console.log("Total - props:")
  console.log(props)
  
  // ...liian Old School!!!
  /* var total = 0
  for (var i = 0; i < props.parts.length; i++) {
    //console.log(props.parts[i].exercises)
    total = total + props.parts[i].exercises
  } */

  // Edit:
  // 2.3*: kurssitiedot step8
  //Jos et jo niin tehnyt, laske koodissasi tehtävien määrä 
  // taulukon metodilla reduce.
  // Tämä tuli näköjään jo "vahingossa" tehtyä step7 kohdassa...

  var total = props.parts.reduce((sum, part) => sum + part.exercises, 0)




  console.log(total)
  return (
    <div>
      <p><strong>Total number of exercises {total}</strong></p>
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
        exercises: 11,
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