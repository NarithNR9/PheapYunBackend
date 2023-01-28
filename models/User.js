const mongoose = require('mongoose')
const Schema = mongoose.Schema
var current = new Date()
const timeStamp = new Date(
  Date.UTC(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    current.getHours(),
    current.getMinutes(),
    current.getSeconds(),
    current.getMilliseconds()
  )
)

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  password: {
    type: String,
    default: ''
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  imageUrl: {
    type: String,
    default: null
  },
  favourite: [
    {
      movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
        default: ''
      },
    },
  ],
  createdAt: {
    type: Date,
    default: timeStamp,
  },
})

module.exports = mongoose.model('User', userSchema)
