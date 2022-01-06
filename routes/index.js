const express = require('express')
const router = express.Router()
const homeRoutes = require('./modules/home')
const usersRoutes = require('./modules/user')
const authRoutes = require('./modules/auth')

const { authenticator } = require('../middleware/auth')


router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/', authenticator, homeRoutes)

exports = module.exports = router