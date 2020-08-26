import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
/* import notificationReducer from './reducers/notificationReducer'
import { createStore } from 'redux'
 */
//const store = createStore(notificationReducer)



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)