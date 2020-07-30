import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/* const GetAnecdote = (props) => {
  var index = Math.floor(Math.random() * anecdotes.length)
  console.log(index)
  return (
  <div>{index}</div>

  )

} */

const App = (props) => {
  const [selected, setSelected] = useState(0)

  //const votes = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  

  

  const handleClick = () => {
    // ei samaa anekdoottia kahteen kertaan...
    var index = selected
    while (index === selected) {
      index = Math.floor(Math.random() * anecdotes.length)
    }
    //var index = Math.floor(Math.random() * anecdotes.length)
    console.log(index)
    setSelected(index)
  }

  const handleVoteClick = () => {
    //console.log(points)
    const copy = [...points]
    //console.log(selected)
    copy[selected] += 1
    //console.log(copy[selected])
    setPoints(copy)
    //console.log(points)
    
    
    
  }

  console.log(points)

  return (
    <div>
      {props.anecdotes[selected]}
      <div>This anecdote has {points[selected]} votes</div>
      <div>
        <button onClick={() => handleVoteClick()}>Vote</button>
        <button onClick={() => handleClick()}>Get anecdote</button>
        </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)