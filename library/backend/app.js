const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Book = require('./models/Book')

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() => console.log('Mongoose connected'))
  .catch(err => console.error('Mongoose con\'t be connected', err))

app.use(bodyParser.json())
app.use(cors())

app.post('/api/books', (req, res) => {
  const book = new Book({
    ...req.body
  })
  book.save()
    .then(book => {
      res.status(201)
        .json({
          bookId: book._id,
          title: book.title,
          author: book.author,
          pages: book.pages
        })
    })
})

app.put('/api/books/:bookId', (req, res) => {
  const book = new Book({
    _id: req.params.bookId,
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages
  })
  Book.updateOne({ _id: req.params.bookId }, book)
    .then(response => {
      res.status(200)
        .json({ message: 'Book Successfully updated' })
    })
})

app.get('/api/books', (_, res) => {
  Book
    .find()
    .then(doc => {
      res
        .status(200)
        .json(doc.map(el => ({
          bookId: el._id,
          title: el.title,
          author: el.author,
          pages: el.pages
        })))
    })
})

app.get('/api/books/:bookId', (req, res) => {
  Book.findById(req.params.bookId)
    .then(book => {
      if (book) {
        res.status(200)
          .json(book)
      } else {
        res.status(404)
          .json({ message: 'Book not found' })
      }
    })
})

app.delete('/api/books/:bookId', (req, res) => {
  Book
    .deleteOne({ _id: req.params.bookId })
    .then(response => {
      if (response) {
        res.status(200)
          .json({ message: 'Book successfully removed'})
      }
    })
})

module.exports = app
