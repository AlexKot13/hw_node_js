import mysql from 'mysql2'

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '131719SashaKot&',
  database: 'product_db'
})

db.connect((err) => {
  if (err) {
    console.log('Ошибка подключения', err)
    return
  }
    console.log('Подключение к базе успешно')
})

export default db

