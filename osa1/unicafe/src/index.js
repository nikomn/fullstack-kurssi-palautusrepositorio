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
      <StatisticLine text="GOOD" value={props.good} />
      <StatisticLine text="NEUTRAL" value={props.neutral} />
      <StatisticLine text="BAD" value={props.bad} />
      <StatisticLine text="ALL" value={all} />
      <StatisticLine text="AVARGE" value={avr} />
      <StatisticLine text="POSITIVE" value={positive} />
    </>
  )
}

const StatisticLine = (props) => {
  console.log(props)
  return (
  <div>{props.text}: {props.value}</div>
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

      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)