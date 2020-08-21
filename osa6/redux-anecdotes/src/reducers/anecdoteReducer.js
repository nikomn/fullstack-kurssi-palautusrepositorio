const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  console.log('actiontype', action.type)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnectode = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnectode 
      ).sort(function (a, b) {
        return b.votes - a.votes
      })
      /* return tempVoteState.sort(function (a, b) {
        return b.votes - a.votes
      }) */


      /* return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnectode 
      ) */

      //const sortedBlog = blogs.sort(function (a, b) {
        //return b.likes - a.likes
      //})
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'BAD':
      return state
    case 'ZERO':
      return state
    default:
      return state
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: generateId(),
      votes: 0
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer