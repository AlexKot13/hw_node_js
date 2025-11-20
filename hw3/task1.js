const fs = require('fs')

fs.mkdir('myFolder', (err) => {
  if (err) {
    console.log('Ошибка при создании каталога', err)
    return
  }
})

console.log('Каталог myFolder успешно создан!')

fs.rmdir('myFolder', (err) => {
  if (err) {
    console.log('Ошибка при удалении каталога', err)
    return
  }
})

console.log('Каталог myFolder успешно удален!')