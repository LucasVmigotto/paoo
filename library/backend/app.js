const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')

const books = [
  {
    bookId: 1,
    title: 'The Man in the High Castle',
    author: 'Philip K Dick',
    pages: 237
  },
  {
    bookId: 2,
    title: 'Neuromancer',
    author: 'William Gibson',
    pages: 320
  }
]

app.use(bodyParser.json())
app.use(cors())

app.post('/api/books', (req, res) => {
  const book = {
    bookId: books[books.length - 1].bookId + 1,
    ...req.body
  }
  books.push(book)
  res
    .status(201)
    .json(book)
})

app.get('/api/books', (_, res) => {
  res
    .status(200)
    .json(books)
})

module.exports = app
