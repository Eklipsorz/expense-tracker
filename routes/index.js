const express = require('express')
const router = express.Router()
const homeRoutes = require('./modules/home')
const usersRoutes = require('./modules/user')
const expenseRoutes = require('./modules/expense')
const authRoutes = require('./modules/auth')

const { authenticator } = require('../middleware/auth')
const { renderNotFound } = require('../middleware/notFound')

// route binding
router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/expenses', authenticator, expenseRoutes)
router.use('/', authenticator, homeRoutes)
router.use('/', renderNotFound )

exports = module.exports = router