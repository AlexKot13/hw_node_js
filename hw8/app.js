import express from 'express'
import sequelize from './config/db.js'
import dotenv from 'dotenv'
import Book from './models/book.js'

const app = express()
app.use(express.json())

dotenv.config()

sequelize
.authenticate()
.then(() => console.log('DB connected'))
.catch(err => console.log('DB error:', err))

app.get('/', (req, res) => {
  res.send('Server working!')
})

app.get('/books', async (req, res) => {
  const books = await Book.findAll()
  res.json(books)
})

app.post('/books', async (req, res) => {
  const {title, author, year} = req.body
  const newBook = await Book.create({title, author, year})
  res.json(newBook)
})

app.put('/books/:id', async (req, res) => {
  const {id} = req.params
  const {title, author, year} = req.body
  await Book.update({title, author, year}, {where: {id}})
  res.json({message: 'Book updated'})
})

app.delete('/books/:id', async (req, res) => {
  const {id} = req.params
  await Book.destroy({where: {id}})
  res.json({message: 'Book deleted'})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => 
console.log(`Server started on port ${PORT}`)
)