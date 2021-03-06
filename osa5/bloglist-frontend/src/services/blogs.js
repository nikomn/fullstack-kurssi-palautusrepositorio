import axios from 'axios'
//const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const blogObject = {
    user: updatedBlog.user,
    likes: updatedBlog.likes,
    author: updatedBlog.author,
    title: updatedBlog.title,
    url: updatedBlog.url,
  }
  const response = await axios.put(baseUrl + '/' + updatedBlog.id, blogObject, config)
  return response.data
  //getAll()
}

const remove = async deletableBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl + '/' + deletableBlog.id, config)
  return response.data


}

export default { getAll, create, setToken, update, remove }