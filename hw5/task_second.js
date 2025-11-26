import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
 
  try {
    if(req.url === '/error') {
      throw new Error('Тестовая ошибка')
    } 
  } catch (err) {
      const logEntry = `${new Date().toISOString()} - ${err.message}\n`
      fs.appendFile('errors.log', logEntry, (fileErr) => {
        if (fileErr) {
          console.log('Ошибка при записи в errors.log:', fileErr)
        }
      })

      res.statusCode = 500
      res.end('Internal Server Error')
    }
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
