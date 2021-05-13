const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const { router } = require('./routes')

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() => console.log('Mongoose connected'))
  .catch(err => console.error('Mongoose con\'t be connected', err))

app.use(bodyParser.json())
app.use(cors())

app.use('/api/books', router)

module.exports = app
