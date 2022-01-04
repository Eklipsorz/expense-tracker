

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy


const userModel = require('../models/userModel')

const bcrypt = require('bcryptjs')

function usePassport(app) {

  app.use(passport.initialize())
  app.use(passport.session())


  passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  }, (req, email, password, done) => {
    userModel.findOne({ email })
      .then((user) => {
        if (!user) return done(null, false, { message: 'The email is not registered!!' })

        return bcrypt.compare(password, user.password)
          .then((isMatched) => {
            if (!isMatched) return done(null, false, { message: 'Incorrect email or password!!' })
            return done(null, user)
          })

      })
      .catch(error => done(error, false))
  }))


  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {


    const { name, email } = profile._json

    userModel.findOne({ email })
      .then(user => {
        if (user) return done(null, user)

        const newPassword = Math.random().toString(36).slice(-8)

        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(newPassword, salt))
          .then(hash => {
            return userModel.create({
              name,
              email,
              password: hash
            })
          })
          .then(user => done(null, user))
      })
      .catch(error => done(error, false))


  }))




  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((userId, done) => {

    userModel.findById(userId)
      .lean()
      .then((user) => done(null, user))
      .catch(error => done(error, false))
  })


}

exports = module.exports = usePassport