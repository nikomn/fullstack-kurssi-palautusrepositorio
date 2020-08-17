const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salsainen', 10)
    const user = new User({ username: 'testitunnus', passwordHash })

    await user.save()
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

    const testUser = {
        "username": "testitunnus",
        "password": "salsainen"
    }

    const request = await api
      .post('/api/login')
      .send(testUser)

    //expect(request.body).toBe("sad")

    const token = request.body.token
    //json(blogs.map(blog => blog.toJSON()))
    //expect(tokenBody).toBe("asdas")

    /* const passwordHash = await bcrypt.hash('salsainen', 10)
    const user = new User({ username: 'testitunnus1', passwordHash })

    await user.save() */

    //logger.info(testUser.token)

    //const decodedToken = jwt.verify(token, process.env.SECRET)

    //expect(decodedToken).toBe("ljlkjdsfk")


    /* await api
    .post('/api/login')
    .send(testUser)
    .expect(200) */
    
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
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

    const testUser = {
      "username": "testitunnus",
      "password": "salsainen"
    }

    const request = await api
      .post('/api/login')
      .send(testUser)

    const token = request.body.token

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
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

        const testUser = {
          "username": "testitunnus",
          "password": "salsainen"
        }
    
        const request = await api
          .post('/api/login')
          .send(testUser)
    
        const token = request.body.token
    
        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(400)
    
    })

    test('new blog added without field ulr is not added to db', async () => {
        const newBlog = {
            title: 'Type wars',
            author: 'Robert C. Martin',
            likes: 0
        }

        const testUser = {
          "username": "testitunnus",
          "password": "salsainen"
        }
    
        const request = await api
          .post('/api/login')
          .send(testUser)
    
        const token = request.body.token
    
        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer ' + token)
            .send(newBlog)
            .expect(400)
    
    })

    test('new blog added without token is not added to db, returns 401 Unauthorized', async () => {
      const newBlog = {
          title: 'Type wars',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
          likes: 0
      }

  
      await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
  
  })
})

describe('deletion of a blog', () => {
    test('deletion succeeds with status code 204 if id is valid', async () => {
      const newBlog = {
        title: 'New Blog',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0
      }
  
      const testUser = {
          "username": "testitunnus",
          "password": "salsainen"
      }
  
      const request = await api
        .post('/api/login')
        .send(testUser)
  
      const token = request.body.token
      
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)



      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

      // Check that new blog is actually added...
      expect(blogsAtStart.length).toBe(helper.initialBlogs.length + 1)
      const tmp = blogsAtStart.map(n => n.title)
      expect(tmp).toContain('New Blog')

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', 'bearer ' + token)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length - 1
      )

      const contents = blogsAtEnd.map(r => r.title)

      expect(contents).not.toContain(blogToDelete.title)
    
    })
})

describe('updating of a blog', () => {
    test('updating likes succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      //blogToUpdate.likes = 9999

      const b = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 9999,
        }


      //expect(blogToDelete.id).toBe(0)

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(b)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      const updatedBlog = blogsAtEnd[0]
      expect(blogToUpdate.id).toBe(updatedBlog.id)
      expect(updatedBlog.likes).toBe(9999)
    
    })
})

describe('User management', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salsainen', 10)
    const user = new User({ username: 'testitunnus', passwordHash })

    await user.save()
  })

  test('creation fails if username too short, failed attempt returns status 400 and proper error message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 't',
      name: 'Testaaja',
      password: 'salsa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'User validation failed: username: Path `username` (`t`) is shorter than the minimum allowed length (3).' })
      //.expect.stringContaining("error")
      //.expect.toThrow('error')
      //.expect("error").toBe("error")
      //.expect('Content-Type', /application\/json/)
      //.expect(api.body, /application\/json/)

      //const body = response.map(x => x.text)
      //expect(body).toContain("shorter than the minimum allowed length")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('creation fails if password too short, failed attempt returns status 400 and proper error message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testi',
      name: 'Testaaja',
      password: 's',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'error creating user! Password is shorter than the minimum allowed length (3)' })

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('creation fails if password is missing, failed attempt returns status 400 and proper error message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testi',
      name: 'Testaaja',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'password missing' })


    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('creation fails if username is missing, failed attempt returns status 400 and proper error message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Testaaja',
      password: 'salsa'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'User validation failed: username: Path `username` is required.' })


    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('creation fails if username is already in database, failed attempt returns status 400 and proper error message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testitunnus',
      name: 'Testaaja',
      password: 'salsa'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'User validation failed: username: Error, expected `username` to be unique. Value: `testitunnus`' })


    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })
})




afterAll(() => {
    mongoose.connection.close()
    })
