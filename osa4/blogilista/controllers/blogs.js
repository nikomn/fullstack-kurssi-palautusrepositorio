const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
})

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})


/* blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      //response.status(201).json(result)
      response.json(result)
    })
}) */

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})


module.exports = blogsRouter