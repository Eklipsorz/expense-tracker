const express = require('express')
const moment = require('moment')
const router = express.Router()

const recordModel = require('../../models/recordModel')
const categoryModel = require('../../models/categoryModel')


router.get('/', async (req, res) => {

  const userId = req.user._id
  const categoryId = req.query.categoryId


  const iconArray = await categoryModel.find({}).lean().then()

  const where = categoryId ?
    { userId, categoryId } :
    { userId }



  recordModel.find(where)
    .lean()
    .then(records => {

      const totalAmount = records.reduce((previousValue, record) => {
        return previousValue + record.amount
      }, 0)

      // categoryModel.findOne({ records.categoryId })
      records.forEach(record => {
        record.date = moment(record.date).format('YYYY/MM/DD')
        record.icon = iconArray.find(item => {
          return item._id.equals(record.categoryId)
        }).icon

      })

      console.log(records)

      res.render('index', { totalAmount, records })

    })
    .catch(error => console.log(error))

})

exports = module.exports = router