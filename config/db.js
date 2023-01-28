const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(`Error: ${err.message}`)
  }
}

module.exports = connectDB
