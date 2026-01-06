import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB подключина")
  } catch (error) {
    console.log("Ошибка подключения MongoDB:", error)
  }
}

app.get("/", (req, res) => {
  res.send("Server is running")
})

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`)
  })
}

startServer()