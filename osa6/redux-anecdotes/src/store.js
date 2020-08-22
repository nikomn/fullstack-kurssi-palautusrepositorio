import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//import anecdoteService from './services/anecdotes'

import ancedoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

//import noteReducer, { initializeAnecdotes } from './reducers/noteReducer'

const reducer = combineReducers({
  anecdotes: ancedoteReducer,
  notification: notificationReducer
})


const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )

//anecdoteService.getAll().then(anecdotes =>
  /* anecdotes.forEach(anecdote => {
    store.dispatch({ type: 'NEW_ANECDOTE', data: anecdote })
  }) */
  //store.dispatch(initializeAnecdotes(anecdotes))
//)
  
  export default store