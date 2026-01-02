import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import User from "./models/User.js"

import auth from "./middleware/auth.js"
import checkRole from "./middleware/checkRole.js"

const app = express()
app.use(express.json())

mongoose.connect("mongodb://local.host:27017//auth")

app.post("/register", async (req, res) => {
  const {email, password} = req.body

  const existingUser = await User.findOne({email})
  if (existingUser) {
    return res.status(400).json ({message: "Email уже зарегистрирован"})
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({
    email,
    password: hashedPassword
  })

  await user.save()

  res.json({message: "Регистрация успешна"})
})

app.get("/admin", auth, checkRole, (req, res) => {
  res.json({message: "Добро пожаловать, администратор!"})
})

app.post("/change-email", auth, async (req, res) => {
  const {newEmail, password} = req.body
  const isMatch = await bcrypt.compare(password, req.user.password)
  if (!isMatch) {
    return res.status(400).json({message: "Неверный пароль"})
  }
  const emailExists = await User.findOne({email: newEmail})
  if (emailExists) {
    return res.status(400).json({
      message: "Email уже используется"
    })
  }
  req.user.email = newEmail
  await req.user.save()

  res.json({message: "Email успешно обновлён"})
})

const PORT = 3000
app.listen(PORT, () => {
  console.log("Сервер запущен на порту 3000")
})
