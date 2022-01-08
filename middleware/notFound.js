
function renderNotFound(req, res) {
  res.status(404)
  res.format({
    html: function () {
      res.render('404')
    }
  })
}

exports = module.exports = { renderNotFound }