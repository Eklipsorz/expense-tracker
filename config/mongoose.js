const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASSWORD
})

db = mongoose.connection


db.on('error', () => {
  console.log('MongoDB connection occurs error')
})

db.on('open', () => {
  console.log('MongoDB connection has been built')
})

exports = module.exports = db


