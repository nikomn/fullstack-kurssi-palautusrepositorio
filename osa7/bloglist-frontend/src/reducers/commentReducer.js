import commentService from '../services/comments'

const reducer = (state = [], action) => {
  console.log('comment state now: ', state)
  console.log('comment action', action)
  switch (action.type) {
  case 'NEW_COMMENT':
    return [...state, action.data]
  case 'INIT_COMMENTS':
    return action.data
  default:
    return state
  }
}


export const createComment = content => {
  console.log('comment contentti: ', content)
  return async dispatch => {
    const newComment = await commentService.create(content)
    console.log('newComment: ', newComment)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment
    })
  }
}


export const initializeComments = () => {
  return async dispatch => {
    const comments = await commentService.getAll()
    dispatch({
      type: 'INIT_COMMENTS',
      data: comments,
    })
  }

}

export default reducer