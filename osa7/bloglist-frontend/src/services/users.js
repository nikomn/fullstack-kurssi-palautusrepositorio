import axios from 'axios'

const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  const res = request.then(response => response.data)
  console.log('res: ', res)
  return res
}

export default { getAll }