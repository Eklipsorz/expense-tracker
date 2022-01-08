
// third-party module 
const express = require('express')
const exphbs = require('express-handlebars')


const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')


const usePassport = require('./config/passport')
const handelbarsOptions = require('./config/handlebars')

const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// start to connect db
const mongoose = require('mongoose')
const db = require('./config/mongoose')

// define a port for web application
const port = process.env.PORT || 3000


// define an application object
const app = express()

// settings for view engine 
app.engine(".hbs", exphbs(handelbarsOptions))
app.set("view engine", ".hbs")


// settings for session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// define a path for all static files
app.use(express.static("public"))

// enable to decode body inside urlencoded packet
app.use(express.urlencoded({ extended: true }))

// enable to transfer method via query string
app.use(methodOverride('_method'))

// load passport and its setting 
usePassport(app)

// load connect-flash middleware
app.use(flash())

// a middleware which accepts system message (e.g., user info, warning message)
app.use('/', (req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  res.locals.loginFailureMessage = req.flash('error')
  res.locals.loginFirstWarningMessage = req.flash('loginfirst-warning-message')
  res.locals.logoutSuccessMessage = req.flash('logout-success-message')

  next()
})


// define application layer routes
app.use('/', routes)

// start to listen at 3000
app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})