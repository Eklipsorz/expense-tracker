const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define a user schema
const userSchema = new Schema({
  // user name
  name: { type: String, required: true },
  // user's email or account in this system
  email: { type: String, required: true },
  // user's password in this system
  password: { type: String, required: true },
  // user's creation time
  createAt: { type: Date, default: Date.now }
})

exports = module.exports = mongoose.model('users', userSchema)