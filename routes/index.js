const express = require('express')
const router = express.Router()
const homeRoutes = require('./modules/home')
const usersRoutes = require('./modules/user')
const authRoutes = require('./modules/auth')





router.use('/auth', authRoutes)
router.use('/users', usersRoutes)

router.use('/', homeRoutes)

exports = module.exports = router