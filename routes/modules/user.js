const express = require('express')
const router = express.Router()

const userModel = require('../../models/userModel')
const passport = require('passport')
const bcrypt = require('bcryptjs/dist/bcrypt')



// GET /users/login
// render a login page
router.get('/login', (req, res) => {
  res.render('login', { layout: 'entryLayout' })
})


// POST /users/login
// authenticate account and passowrd by passport.js and its local strategy
router.post('/login', passport.authenticate('local', {
  failureFlash: true,
  failureRedirect: '/users/login',
  successRedirect: '/',
  badRequestMessage: 'You need to input account and password'
}))


// GET /users/register
// render a register page
router.get('/register', (req, res) => {
  res.render('register', { layout: 'entryLayout' })
})


// POST /users/register
// check each field on register form and create a new user
router.post('/register', (req, res) => {

  const { name, email, password, confirmPassword } = req.body
  const registerWarningMessages = []

  // one of all fields is empty, then it adds warning message to registerWarningMessages
  if (!name || !email || !password || !confirmPassword) {
    registerWarningMessages.push('Please input all fields')
  }


  // the passwords are not same, then it adds warning message to registerWarningMessages
  if (password !== confirmPassword) {
    registerWarningMessages.push('The passwords are not same')
  }

  // if there is something in registerWarningMessages, 
  // then render a register page with all warning messages
  if (registerWarningMessages.length) {
    return res.render('register', {
      layout: 'entryLayout',
      registerWarningMessages,
      name,
      email,
      password,
      confirmPassword
    })
  }

  // if each field is not empty and the passwords are same
  // find a user with email
  return userModel.findOne({ email })
    .then(user => {

      // check whether the user is registered
      // if user is registered
      if (user) {
        // render a register page with the warning message 
        registerWarningMessages.push('The email has been registered')
        return res.render('register', {
          layout: 'entryLayout',
          registerWarningMessages,
          name,
          email,
          password,
          confirmPassword
        })
      }

      // if user is not registered
      // create a hash password and a new user
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          return userModel.create({
            name,
            email,
            password: hash
          })
        })
        .then(() => res.redirect('/users/login'))
        .catch(error => console.log(error))
    })


})

// POST /users/logout
// destroy session and help user redirect to login page
router.get('/logout', (req, res) => {

  req.logout()
  req.flash('logout-success-message', 'You have successfully logged out')
  res.redirect('/users/login')

})


exports = module.exports = router