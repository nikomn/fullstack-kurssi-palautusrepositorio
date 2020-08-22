const notificationReducer = (state = {"message": null, "cue": 0}, action) => {
    console.log('notification state now: ', state)
    console.log('not action', action)
    switch (action.type) {
      case 'SET_NOTIFICATION':
        console.log(state)
        const currentNotification = { 
          message: action.notification.message,
          cue: state.cue + 1
        }
        return currentNotification
      case 'NULL_NOTIFICATION':
        //console.log(state)
        if (state.cue === 1) {
          const nullNotification = { 
            message: null,
            cue: 0
          }
          return nullNotification
        }

        const currentNullNotification = { 
          message: state.message,
          cue: state.cue - 1
        }
        return currentNullNotification
        
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


  
export default notificationReducer