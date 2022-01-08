const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define a expense record schema
const recordSchema = new Schema({
  // expense record name
  name: { type: String, required: true },
  // expense record date
  date: { type: Date, required: true },
  // expense record amount
  amount: { type: Number, required: true },
  // expense record owner (as index)
  userId: { type: Schema.Types.ObjectId, ref: 'users', index: true, required: true },
  // expense record category
  categoryId: { type: Schema.Types.ObjectId, ref: 'categories', required: true }
})


exports = module.exports = mongoose.model('records', recordSchema)