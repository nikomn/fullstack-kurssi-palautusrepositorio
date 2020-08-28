import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api'

const getConfig = () => {
    return {
      headers: { Authorization: `bearer ${storage.loadUser().token}` }
    }
  }

const getAll = () => {
  const request = axios.get(baseUrl + '/comments')
  const res = request.then(response => response.data)
  console.log('res: ', res)
  return res
}

const create = (content) => {
    //const url = `/api/blogs/${comment.blog.id}/comments`
    console.log('comment create props: ', content)
    const newComment = { content: content.content }
    const request = axios.post(`${baseUrl}/blogs/${content.blog}/comments`, newComment, getConfig())
    return request.then(response => response.data)
  }

export default { getAll, create }