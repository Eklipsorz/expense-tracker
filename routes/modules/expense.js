const express = require('express')

const mongoose = require('mongoose')
const categoryModel = require('../../models/categoryModel')
const router = express.Router()

router.get('/create', async (req, res) => {


  const categoryArray = await categoryModel.find({}).lean().then()
  console.log(categoryArray)
  res.render('create', { categoryArray })
})


exports = module.exports = router