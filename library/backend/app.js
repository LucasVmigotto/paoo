const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Book = require('./models/Book')

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() => console.log('Mongoose connected'))
  .catch(() => console.error('Mongoose con\'t be connected'))

app.use(bodyParser.json())
app.use(cors())

app.post('/api/books', (req, res) => {
  const book = new Book({
    ...req.body
  })
  book.save()
  res
    .status(201)
    .json(book)
})

app.get('/api/books', (_, res) => {
  Book
    .find()
    .then(doc => {
      res
        .status(200)
        .json(doc)
    })
})

module.exports = app
