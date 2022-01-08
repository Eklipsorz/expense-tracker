

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const userModel = require('../models/userModel')

const bcrypt = require('bcryptjs')

/**
* bind passport and its passport setting to app object
* @param {Object} app 
* 
*/
function usePassport(app) {

  app.use(passport.initialize())
  app.use(passport.session())


  // define a local strategy 
  passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  }, (req, email, password, done) => {
    // when receiving email and password user inputs

    // find a user with received
    userModel.findOne({ email })
      .then((user) => {
        // cannot find the user
        if (!user) return done(null, false, { message: 'The email is not registered!!' })

        // success find the user and compare with hash password
        return bcrypt.compare(password, user.password)
          .then((isMatched) => {
            // the hash password is not matched
            if (!isMatched) return done(null, false, { message: 'Incorrect email or password!!' })

            // the hash password is matched
            return done(null, user)
          })

      })
      .catch(error => done(error, false))
  }))


  // define a facebook strategy
  passport.use(new FacebookStrategy({
    // FACEBOOK API ID
    clientID: process.env.FACEBOOK_ID,
    // FACEBOOK API SECRET
    clientSecret: process.env.FACEBOOK_SECRET,
    // FACEBOOK API CALLBACK for receving authentication code
    callbackURL: process.env.FACEBOOK_CALLBACK,
    // Specify which data field 
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    // when successfully receiving the tokens and profile


    const { name, email } = profile._json
    // find a user with email
    userModel.findOne({ email })
      .then(user => {

        // successfully find the user
        if (user) return done(null, user)

        // cannot find user (the user is not registered), then create the user

        // create a random hash passowrd to the user
        const newPassword = Math.random().toString(36).slice(-8)
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(newPassword, salt))
          .then(hash => {
            // create the new user with name email and hash password
            return userModel.create({
              name,
              email,
              password: hash
            })
          })
          // successfully create and then noify passport.js with done
          .then(user => done(null, user))
      })
      .catch(error => done(error, false))


  }))



  // define a serialization and deserialization for passport
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