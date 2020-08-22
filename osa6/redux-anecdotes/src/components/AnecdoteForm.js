import React from 'react'
import { connect } from 'react-redux' 
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

//import anecdoteService from '../services/anecdotes'

const anecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`added anecdote '${content}'`, 5)
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

const mapStateToProps = (state) => {
  return {
      notification: state.notification
    }
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(anecdoteForm)


export default ConnectedAnecdoteForm