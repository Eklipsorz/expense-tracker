
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const categoryModel = require('../categoryModel')
const categories = require('./category.json').results




db.on('open', async () => {


  await categoryModel.create(categories)
  console.log('All type of categories have been built')
  db.close()

})

