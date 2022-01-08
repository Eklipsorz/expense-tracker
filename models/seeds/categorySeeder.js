
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const categoryModel = require('../categoryModel')
const categories = require('./category.json').results


db.on('open', async () => {

  // check whether all seed category data have been built
  // if true, it means they are built in database
  // if false, it means they are not built
  const hasCategories = (await categoryModel.find({}).lean().then()).length

  // all seed category data are not built
  if (!hasCategories) {
    // create all seed category data into database
    await categoryModel.create(categories)
  }
  
  console.log('All type of categories have been built')
  // close database connection
  db.close()

})

