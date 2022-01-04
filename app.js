const express = require('express')
const exphbs = require('express-handlebars')


const methodOverride = require('method-override')

const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


// define a port for web application
const port = process.env.PORT || 3000


// define an application object
const app = express()

// settings for view engine 
app.engine(".hbs", exphbs({
  extname: ".hbs",
  layoutsDir: process.cwd() + "/views/layouts",
  defaultLayout: "main",
  partialDir: "views/partials",
}))

app.set("view engine", ".hbs")

// define a path for all static files
app.use(express.static("public"))


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// define application layer routes
app.use('/', routes)

// start to listen at 3000
app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})