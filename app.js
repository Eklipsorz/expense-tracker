const express = require('express')


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


// define a port for web application
const port = process.env.PORT || 3000


// define an application object
const app = express()



// define application layer routes
app.use('/', (req, res) => {
  console.log('test project')
})

// start to listen at 3000
app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})