const express = require('express')
const router = express.Router()
const homeRoutes = require('./modules/home')
const usersRoutes = require('./modules/user')






router.use('/users', usersRoutes)

router.use('/', homeRoutes)

exports = module.exports = router