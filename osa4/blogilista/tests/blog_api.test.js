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

test('new blog can be added ', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'Go To Statement Considered Harmful'
    )
  })

test('new blog added without number of likes defaults to 0 likes', async () => {
    const newBlog = {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    //const contents = blogsAtEnd.map(n => n.title)
    const addedBlog = blogsAtEnd[blogsAtEnd.length - 1]
    expect(addedBlog.likes).toBeDefined()
    expect(addedBlog.likes).toBe(0)
})

describe('adding blog with missing fields', () => {
    test('new blog added without field title is not added to db', async () => {
        const newBlog = {
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 0
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    
    })

    test('new blog added without field ulr is not added to db', async () => {
        const newBlog = {
            title: 'Type wars',
            author: 'Robert C. Martin',
            likes: 0
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    
    })
})



afterAll(() => {
    mongoose.connection.close()
    })
