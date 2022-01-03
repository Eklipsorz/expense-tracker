const mongoose = require('mongoose')
const Schema = mongoose.Schema


const recordSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'users', index: true, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'categories', required: true }
})


exports = module.exports = mongoose.model('records', recordSchema)