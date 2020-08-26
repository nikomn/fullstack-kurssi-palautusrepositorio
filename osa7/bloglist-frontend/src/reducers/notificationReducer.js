const notificationReducer = (state = { message: null, type: 'success', cue: 0 }, action) => {
  console.log('notification state now: ', state)
  console.log('not action', action)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    console.log('SET_NOTIFICATION')
    console.log(state)
    return {
      message: action.notification.message,
      type: action.notification.type,
      cue: state.cue + 1
    }
  case 'NULL_NOTIFICATION':
    //console.log(state)
    if (state.cue === 1) {
      return {
        message: null,
        type: 'success',
        cue: 0
      }
    }

    return {
      message: state.message,
      type: state.type,
      cue: state.cue - 1
    }

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


export const setReducerNotification = (notification, seconds) => {
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



export default notificationReducer