import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/* const handleGoodClick = () => {
  const newClick = {good: good.value + 1}
} */
  

/* const handleBadClick = () =>
  setClicks({ ...clicks, bad: clicks.bad + 1 })

const handleNeutralClick = () =>
  setClicks({ ...clicks, neutral: clicks.neutral + 1 }) */

const Stats = (props) => {
  console.log(props)
  return (
    <div>
      ALL: {props.good + props.neutral + props.bad} 
    </div>
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
      <div>ALL: {(good + neutral + bad)}</div>
      <div>Avarage: {(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}</div>
      <div>Positive: {good / (good + neutral + bad) * 100} %</div>
    {/* <div>{(good + neutral + bad) / 3}</div> */}
      {/* {Stats("good"={good}, "neutral"={neutral}, "bad"={bad})} */}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)