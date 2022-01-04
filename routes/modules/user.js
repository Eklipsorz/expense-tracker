const express = require('express')
const router = express.Router()

const userModel = require('../../models/userModel')
const passport = require('passport')
const bcrypt = require('bcryptjs/dist/bcrypt')




router.get('/login', (req, res) => {
  res.render('login', { layout: 'entryLayout' })
})



router.post('/login', passport.authenticate('local', {
  failureFlash: true,
  failureRedirect: '/users/login',
  successRedirect: '/'
}))


router.get('/register', (req, res) => {
  res.render('register', { layout: 'entryLayout' })
})



router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const registerWarningMessages = []

  if (!name || !email || !password || !confirmPassword) {
    registerWarningMessages.push('Please input all fields')
  }

  if (password !== confirmPassword) {
    registerWarningMessages.push('The passwords are not same')
  }

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


  return userModel.findOne({ email })
    .then(user => {
      if (user) {
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


router.get('/logout', (req, res) => {

})
exports = module.exports = router