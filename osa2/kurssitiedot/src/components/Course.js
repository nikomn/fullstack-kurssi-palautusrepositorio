import React from 'react'


const Header = (props) => {
  //console.log("Header - props:")
  //console.log(props)
  return (
    <div>
      <h2>
        {props.course}
      </h2>
    </div>
  )
}

const Content = (props) => {
  //console.log("Content - props:")
  //console.log(props)

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
  //console.log("Total - props:")
  //console.log(props)
  
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

export default Course