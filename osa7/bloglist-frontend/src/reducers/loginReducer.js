const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  //console.log('actiontype', action.type)
  switch (action.type) {
  case 'LOGIN':
    console.log('login action: ', action)
    return action.data
  default:
    return state
  }
}


export const setReducerUser = user => {
  console.log('setReducerUser propsit: ', user)
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}


export default reducer