
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const categoryModel = require('../categoryModel')
const categories = require('./category.json').results




db.on('open', async () => {

  const hasCategories = (await categoryModel.find({}).lean().then()).length
  if (!hasCategories) {
    await categoryModel.create(categories)
  }
  console.log('All type of categories have been built')
  db.close()

})

