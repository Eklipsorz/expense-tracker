const mongoose = require('mongoose')
const Schema = mongoose.Schema


const categorySchema = new Schema({
  name: { type: String, required: true }
})

exports = module.exports = mongoose.model('categories', categorySchema)