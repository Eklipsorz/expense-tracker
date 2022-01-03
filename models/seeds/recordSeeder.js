const bcrypt = require('bcrypt')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const recordModel = require('../recordModel')
const categoryModel = require('../categoryModel')

const userModel = require('../userModel')
const users = require('./user.json').results
const records = require('./record.json').results


db.on('open', async () => {


  const categories = await categoryModel.find({}).lean().then()

  records.forEach(record => {
    record.categoryId = categories.find(category => category.name === record.category)._id
  })


  const requests = users.map(async (user) => {
    const { name, email, password, useRecordId } = user

    let resultUser = await userModel.findOne({ email }).then()

    if (!resultUser) {
      const hashPassword = await bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt))
      resultUser = await userModel.create({ name, email, password: hashPassword })
    }

    let allocatedRecords = records.filter(record => useRecordId.includes(record.id))

    allocatedRecords.forEach(record => {
      delete record['id']
      delete record['category']
      record.userId = resultUser._id
    })

    await recordModel.create(allocatedRecords)

  })

  Promise.all(requests)
    .then(() => {
      console.log('All seed records and all users have been built')
      db.close()
    })


})