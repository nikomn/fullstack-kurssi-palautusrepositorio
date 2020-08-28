const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  }
})


commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment