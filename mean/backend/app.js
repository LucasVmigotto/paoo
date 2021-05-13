const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { router } = require('./routes')

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() => console.log('Mongoose connected'))
  .catch(err => console.error('Mongoose can\'t be connected', err))

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  )
  next()
})

app.use('/api/clients', router)

module.exports = app
