const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      case 'NULL_NOTIFICATION':
        return null
      default:
        return state
    }
  }

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}


export const setNotification = (notification, seconds) => {
    return async dispatch => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification
      })
      setTimeout(() => {
        dispatch({
          type: 'NULL_NOTIFICATION',
          notification
        })
      }, seconds * 1000)
      
      
    }

}

/* export const voteAnecdote = (id) => {
  return async dispatch => {
    const updatedAnectode = await anecdoteService.update(id)
    //console.log('updatedAnectode reducerissa: ', updatedAnectode)
    dispatch({
      type: 'VOTE',
      data: { updatedAnectode }
    })
  }
  
} */
  
export default notificationReducer