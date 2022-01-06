const express = require('express')
const moment = require('moment')
const router = express.Router()
const mongoose = require('mongoose')

const recordModel = require('../../models/recordModel')
const categoryModel = require('../../models/categoryModel')



// router.get(/^\/$|^\/filter\?category\=.*$/, async (req, res) => {
router.get('/', async (req, res) => {

  let currentCategoryItem = null
  const categoryId = req.query.category
  const userId = req.user._id
  const categoryArray = await categoryModel.find({}).lean().then()


  // There are some strings in Query string inside URL, but query strings are invalid
  if (categoryId) {

    currentCategoryItem = categoryArray.find(item => {
      return categoryId === item._id.toString()
    })

    if (!currentCategoryItem) {
      return res.redirect('/')
    }

  }

  const where = categoryId ?
    { userId, categoryId } :
    { userId }

  recordModel.find(where)
    .lean()
    .then(records => {

      const totalAmount = records.reduce((previousValue, record) => {
        return previousValue + record.amount
      }, 0)

      records.forEach(record => {
        record.date = moment(record.date).format('YYYY/MM/DD')
        record.icon = categoryArray.find(item => {
          return item._id.equals(record.categoryId)
        }).icon

      })
 
      res.render('index', { totalAmount, records, categoryArray, currentCategoryItem })
 
    })
    .catch(error => console.log(error))

})


exports = module.exports = router