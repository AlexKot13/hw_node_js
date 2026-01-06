import express from "express"
import {createServer} from "http"
import { Server } from "socket.io"

const app = express()

const httpServer = createServer(app)

const io = new Server(httpServer)

app.use(express.static("public"))

const PORT = 3000

io.on("connection", (socket) => {
  console.log("Пользователь подключился:", socket.id)

  socket.on("chat message", (message) => {
    console.log("Сообщение от клиента:", message)

    socket.emit(
      "message received",
      `Сервер получил сообщение: ${message}`
    )
  })
  socket.on("disconnect", () => {
    console.log("Пользователь отключился:", socket.id)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`)
})