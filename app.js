const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const userRoute =require('./routes/user.route')
const movieRoute =require('./routes/movie.route')

const PORT = process.env.PORT || 5000

connectDB()
const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE') // or '*' for all method
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(bodyParser.json())

app.use('/user', userRoute)

app.use('/movie', movieRoute)

app.listen(PORT)

 