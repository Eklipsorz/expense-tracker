
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const recordModel = require('../recordModel')
const categoryModel = require('../categoryModel')

const userModel = require('../userModel')
const users = require('./user.json').results
const records = require('./record.json').results


db.on('open', async () => {

  // add categoryId property to each data from json 
  // The category of each data is mapped into categoryId with category name and category ID in db
  const categories = await categoryModel.find({}).lean().then()
  records.forEach(record => {
    record.categoryId = categories.find(category => category.name === record.category)._id
  })


  // create a request for creating a user and its record
  const requests = users.map(async (user) => {

    const { name, email, password, useRecordId } = user

    // check whether the seed user data has been built
    let resultUser = await userModel.findOne({ email }).then()

    // the seed user data are not built
    if (!resultUser) {
      // create the user data into database
      const hashPassword = await bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt))
      resultUser = await userModel.create({ name, email, password: hashPassword })
    }

    // find some records which are belong to current user
    let allocatedRecords = records.filter(record => useRecordId.includes(record.id))
    allocatedRecords.forEach(record => {
      delete record['id']
      delete record['category']
      record.userId = resultUser._id
    })

    // create records
    return await recordModel.create(allocatedRecords)

  })

  // execute all requests as promise
  Promise.all(requests)
    .then(() => {
      console.log('All seed records and all users have been built')
      db.close()
    })


})