import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
            <button onClick={handleClick}>
                vote
            </button>
            </div>
        </div>
    )
}


const Anecdotes = (props) => {

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        props.voteAnecdote(anecdote.id)
        const notification = { "message": `you voted '${anecdote.content}'`, "cue": 1}
        //props.setNotification(`you voted '${anecdote.content}'`, 5)
        props.setNotification(notification, 5)
        /* dispatch(notificationChange(`you voted '${anecdote.content}'`))
        setTimeout(() => {
          dispatch(notificationChange(null))
        }, 5000) */
      }
    return (
        <div>
          <h2>Anecdotes (with connect!)</h2>
          {props.anecdotes.map(anecdote =>
            <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => vote(anecdote)}
            />
          )}
        </div>
      )
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        notification: state.notification
      }
    }

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdotes