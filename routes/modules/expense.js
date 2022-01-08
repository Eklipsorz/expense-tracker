const express = require('express')


const mongoose = require('mongoose')
const moment = require('moment')

const categoryModel = require('../../models/categoryModel')
const recordModel = require('../../models/recordModel')
const router = express.Router()


// GET /expenses/create
// render a expense creation page
router.get('/create', async (req, res) => {
  // obtain current categories from DB
  const categoryArray = await categoryModel.find({}).lean().then()
  res.render('create', { categoryArray })
})

// POST /expenses
// create a expense info to current user
router.post('/', (req, res) => {

  req.body.userId = req.user._id

  const newRecord = new recordModel(req.body)
  newRecord.save()
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// GET /expenses/:id/edit
// render a expense info page with record id (:id)
router.get('/:id/edit', async (req, res) => {


  const userId = req.user._id

  const _id = req.params.id

  let categoryArray = await categoryModel.find({}).lean().then()

  // find a currentRecord with recordID(_id) and userId
  recordModel.findOne({ _id, userId })
    .lean()
    .then((currentRecord) => {
      // transfer date to YYYY-MM-DD format 
      // YYYY -> Year
      // MM -> Month
      // DD -> Day
      currentRecord.date = moment(currentRecord.date).format('YYYY-MM-DD')
      res.render('edit', { categoryArray, currentRecord })
    })


})

// PUT /expenses/:id
// update a expense info to current user
router.put('/:id', (req, res) => {

  req.body.userId = userId = req.user._id
  _id = req.params.id

  recordModel.findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// DELETE /expenses/:id
// delete a expense info to current user
router.delete('/:id', (req, res) => {

  const userId = req.user._id
  const _id = req.params.id

  recordModel.findOneAndRemove({ userId, _id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})
exports = module.exports = router