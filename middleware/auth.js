/**
 * 
 * define a middleware for authenticating and redirect use to login page
 * 
 * @param {*} req (request object)
 * @param {*} res (response object)
 * @param {*} next (next function object)
 * @returns 
 */

function authenticator(req, res, next) {

  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('loginfirst-warning-message', 'You need to login first!!')
  res.redirect('/users/login')
}

exports = module.exports = { authenticator }