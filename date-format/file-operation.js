const fs = require('fs')
require('dotenv').config()

const fileName = process.env.FILENAME

fs.writeFileSync(fileName, 'Hello World!', 'utf8')

const fileContent = fs.readFileSync(fileName, 'utf8')

console.log(fileContent)