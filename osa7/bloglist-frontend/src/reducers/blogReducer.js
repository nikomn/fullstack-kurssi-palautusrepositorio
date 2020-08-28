import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  //console.log('actiontype', action.type)
  switch (action.type) {
  case 'LIKE':
    return state.map(blog =>
      blog.id !== action.data.updatedBlog.id ? blog : action.data.updatedAnectode
    ).sort(function (a, b) {
      return b.likes - a.likes
    })
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data.sort(function (a, b) {
      return b.likes - a.likes
    })
  default:
    return state
  }
}


export const createBlog = content => {
  console.log('contentti: ', content)
  return async dispatch => {
    const newBlog = await blogService.create(content)
    console.log('newBlog: ', newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    console.log('Päivittyy...')
    dispatch({
      type: 'LIKE',
      data: { updatedBlog }
    })
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }

}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    console.log('UPDATING BLOGS...')
    const blogs = await blogService.getAll()
    console.log('blogs now: ', blogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }

}

export default reducer