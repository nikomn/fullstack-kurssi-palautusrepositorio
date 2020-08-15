const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

test('blogs are returned in json form', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

test('blogs identifying field name equals id', async () => {
    const response = await api.get('/api/blogs')
    //expect(response.body[0].id).toBeDefined()
    for (let blog of response.body) {
        expect(blog.id).toBeDefined()

    }
    //expect(response.body).toHaveLength(initialBlogs.length)
})    

afterAll(() => {
    mongoose.connection.close()
    })
