import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import ancedoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: ancedoteReducer,
  notification: notificationReducer
})


const store = createStore(
    reducer,
    composeWithDevTools()
  )
  
  export default store