import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/* const handleGoodClick = () => {
  const newClick = {good: good.value + 1}
} */
  

/* const handleBadClick = () =>
  setClicks({ ...clicks, bad: clicks.bad + 1 })

const handleNeutralClick = () =>
  setClicks({ ...clicks, neutral: clicks.neutral + 1 }) */

const Statistics = (props) => {
  console.log(props)
  const all = props.good + props.neutral + props.bad
  const avr = (props.good * 1 + props.neutral * 0 + props.bad * -1) / all
  const positive = props.good / all * 100
  
  return (
    <>
      <div>ALL: {all}</div>
      <div>AVARGE: {avr}</div>
      <div>POSITIVE: {positive} %</div>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>

      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>

      <h1>Statistics</h1>
      <div>GOOD: {good}</div>
      <div>NEUTRAL: {neutral}</div>
      <div>BAD: {bad}</div>
      {/* <div>ALL: {(good + neutral + bad)}</div>
      <div>Avarage: {(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}</div>
      <div>Positive: {good / (good + neutral + bad) * 100} %</div> */}
    {/* <div>{(good + neutral + bad) / 3}</div> */}
      {/* {Stats("good"={good}, "neutral"={neutral}, "bad"={bad})} */}
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)