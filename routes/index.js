const express = require('express')
const router = express.Router()
const usersRoutes = require('./modules/user')





router.use('/users', usersRoutes)


exports = module.exports = router