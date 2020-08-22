import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  //console.log('actiontype', action.type)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.updatedAnectode.id
      

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data.updatedAnectode 
      ).sort(function (a, b) {
        return b.votes - a.votes
      })
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort(function (a, b) {
        return b.votes - a.votes
      })
    default:
      return state
  }
}


export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const updatedAnectode = await anecdoteService.update(id)
    //console.log('updatedAnectode reducerissa: ', updatedAnectode)
    dispatch({
      type: 'VOTE',
      data: { updatedAnectode }
    })
  }
  
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
  
}

export default reducer