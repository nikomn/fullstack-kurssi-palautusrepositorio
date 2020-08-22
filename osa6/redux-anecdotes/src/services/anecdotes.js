import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  console.log('at create', object)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id) => {
  const object = await axios.get(baseUrl + '/' + id)
  /* console.log('ennen updatea... ', object)
  console.log('ennen updatea...data? ', object.data) */
  const updatedObject = { content: object.data.content, id: object.id, votes: object.data.votes + 1 }
  //console.log('päivtetty... ', updatedObject)
  const response = await axios.put(baseUrl + '/' + id, updatedObject)
  //console.log('jälkeen update... ', response.data)
  return response.data
}

export default { getAll, createNew, update }