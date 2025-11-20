const fs = require('fs')
fs.writeFile('info.txt', 'Node.js is awesome!', 'utf8', (err) => {
  if (err) {
    console.log('Ошибка при записи файла', err)
    return
  }
})

console.log('Файл успешно создан, текст записан!')

fs.readFile('info.txt', 'utf8', (err) => {
  if (err) {
    console.log('Ошибка при чтении файла', err)
    return
  }
})

console.log('Содержимое файла')