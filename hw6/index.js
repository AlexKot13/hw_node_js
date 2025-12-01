import express from 'express'
const app = express()
const PORT = 3000
import db from './db.js'

app.use(express.json())

app.get('/',(req, res) => {
  try {
    res.send('Hello, World')
  } catch (error) {
    res.status(500).send('Произошла ошибка')
  }
})

app.post('/', (req, res) => {
  try {
    const data = req.body
    if (!data.message) {
      return res.status(400).send('Нет данных message')
    }

    res.send(`Вы отправили: ${data.message}`)
  } catch (error) {
    res.status(500).send('Ошибка при обработке данных')
  }
})

app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.log('Ошибка при получении продуктов', err)
      return res.status(500).send('Ошибка сервера')
    }
    res.json(results)
  })
})

app.post('/products', (req, res) => {
  const {name, price} = req.body

  if(!name || !price) {
    return res.status(400).send('Не указаны name или price')
  }

  const sql = 'INSERT INTO products (name, price) VALUES (?, ?)'
  db.query(sql, [name, price], (err, results) => {
    if (err) {
      console.log('Ошибка при добавлении продукта:', err)
      return res.status(500).send('Ошибка')
    }
    res.send(`Продукт '${name}' успешно добавлен с ID: ${results.insertId}`)
  })
})


app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})