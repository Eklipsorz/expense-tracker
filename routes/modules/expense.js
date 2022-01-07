const express = require('express')


const mongoose = require('mongoose')
const moment = require('moment')

const categoryModel = require('../../models/categoryModel')
const recordModel = require('../../models/recordModel')
const router = express.Router()

router.get('/create', async (req, res) => {
  const categoryArray = await categoryModel.find({}).lean().then()
  res.render('create', { categoryArray })
})

router.post('/', (req, res) => {

  req.body.userId = req.user._id
  const newRecord = new recordModel(req.body)
  newRecord.save()
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})


router.get('/:id/edit', async (req, res) => {


  const userId = req.user._id
  const _id = req.params.id

  let categoryArray = await categoryModel.find({}).lean().then()
  let { name, date, amount, categoryId } = await recordModel.findOne({ _id, userId }).lean().then()

  date = moment(date).format('YYYY-MM-DD')


  res.render('edit', { name, date, amount, categoryArray, currentCategoryId: categoryId })
})


exports = module.exports = router