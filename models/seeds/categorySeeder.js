
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const categoryModel = require('../categoryModel')
const categories = require('./category.json').results


db.on('open', async () => {


  // create each category according to category.json
  const requests = categories.map((category) => {
    const { name } = category

    return categoryModel.findOne({ name })
      .lean()
      .then(async (targetCategory) => {
        if (targetCategory) return
        return await categoryModel.create(category)
      })
      .catch(error => console.log(error))
  })

  Promise.all(requests)
    .then(() => {
      console.log('All type of categories have been built')
      db.close()
    })



})

