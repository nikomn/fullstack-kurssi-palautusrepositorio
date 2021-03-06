const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

commentsRouter.get('/comments', async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments.map(comment => comment.toJSON()))
  
  /* Comment
    .find({})
    .then(comments => {
      response.json(comments.map(comment => comment.toJSON()))
    }) */
})

/* commentsRouter.get('/comments', async (request, response) => { 
  const comments = await Comment.find({})
  response.json(comments.map(comment => comment.toJSON()))
}) */


/* commentsRouter.post('/', (request, response) => {
  const comment = new Comment(request.body)

  comment
    .save()
    .then(result => {
      //response.status(201).json(result)
      response.json(result)
    })
}) */

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

commentsRouter.post('/blogs/:id/comments', async (request, response) => {
  const body = request.body
  //const token = tokenExtractor(request)
  //const token = getTokenFrom(request)
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //logger.info("Debug... Program gets to this line of code...")
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'error: token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  //const user = await User.findById(decodedToken.id)
  
  //const user = await User.findById(body.userId)

  if (body.content === undefined) {
    //response.status(400)
    //response.send(400, 'Bad request')
    response.status(400).send({ error: 'Bad request' })
  } else {
    const comment = new Comment({
      content: body.content,
      blog: blog._id
    })
  
  
    //const comment = new Comment(request.body)
  
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    response.json(savedComment.toJSON())
  }
})

module.exports = commentsRouter