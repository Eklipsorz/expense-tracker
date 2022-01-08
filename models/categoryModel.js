const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define a category schema
const categorySchema = new Schema({
  // category name
  name: { type: String, required: true },
  // category icon class on fontawesome
  icon: { type: String, required: true }
})

exports = module.exports = mongoose.model('categories', categorySchema)