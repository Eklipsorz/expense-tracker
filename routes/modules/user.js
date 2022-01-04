const express = require('express')
const router = express.Router()

const passport = require('passport')



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



router.post('/login', (req, res) => {

})


router.get('/logout', (req, res) => {

})
exports = module.exports = router