const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const userRoute = require('./routes/user.route')
const movieRoute = require('./routes/movie.route')
// var cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()
// app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE') // or '*' for all method
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.use(bodyParser.json())

app.use('/user', userRoute)

app.use('/movie', movieRoute)

connectDB().then(() => {
  app.listen(PORT)
})
