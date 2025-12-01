import db from './db.js'

const sql = `
CREATE TABLE IF NOT EXISTS products (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
price DECIMAL(10, 2)
)
`

db.query(sql, (err, results) => {
  if (err) {
    console.log('Ошибка создания таблицы:', err)
    return
  }
    console.log('Таблица products создана')
  db.end()
})