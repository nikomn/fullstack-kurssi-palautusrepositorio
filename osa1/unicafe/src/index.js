import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )


const Statistics = (props) => {
  console.log(props)
  const all = props.good + props.neutral + props.bad
  const avr = (props.good * 1 + props.neutral * 0 + props.bad * -1) / all
  const positive = props.good / all * 100 + " %"

  if (all === 0) {
    return (
      <div>
        No feedback given yet...
      </div>
    )
  }

  

  
  return (
    <>
      

      <table>
        <tbody>
          <StatisticLine2 text="GOOD" value={props.good} />
          <StatisticLine2 text="NEUTRAL" value={props.neutral} />
          <StatisticLine2 text="BAD" value={props.bad} />
          <StatisticLine2 text="ALL" value={all} />
          <StatisticLine2 text="AVARGE" value={avr} />
          <StatisticLine2 text="POSITIVE" value={positive} />
        </tbody>
      </table>

      
    </>
  )
}

const StatisticLine2 = (props) => {
  return (
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
    
    )
}




const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log("Good")
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>

      <Button onClick={handleGoodClick} text='GOOD' />
      <Button onClick={handleNeutralClick} text='NEUTRAL' />
      <Button onClick={handleBadClick} text='BAD' />


      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)