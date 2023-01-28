const mongoose = require('mongoose')
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

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  type: {
    type: String,
    required: [true, 'Please add an type'],
  },
  country: {
    type: String,
    required: [true, 'Please add a country'],
  },
  genre: {
    type: Array,
    required: true,
  },
  episodes: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image url'], 
  },
  createdAt: {
    type: Date,
    default: timeStamp,
  },
})

module.exports = mongoose.model('Movie', movieSchema)
