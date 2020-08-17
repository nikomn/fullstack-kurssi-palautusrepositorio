const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
  })

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.password === undefined) {
    return response.status(400).json({ error: 'password missing' })
  }
  if (body.password.length < 3) {
    //User validation failed: username: Path `username` (`aa`) is shorter than the minimum allowed length (3)
    return response.status(400).json({ error: 'error creating user! Password is shorter than the minimum allowed length (3)' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter