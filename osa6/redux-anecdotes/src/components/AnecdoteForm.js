import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

//import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    /* const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    console.log(newAnecdote) */
    dispatch(setNotification(`added anecdote '${content}'`, 5))
    /* dispatch(notificationChange(`added anecdote '${content}'`))
    setTimeout(() => {
      dispatch(notificationChange(null))
    }, 5000) */
  }
  
  

  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
    </div>
  )
}

export default AnecdoteForm