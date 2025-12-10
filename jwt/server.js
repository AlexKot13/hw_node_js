import express from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import {authenticateJWT} from './middlewares/authenticateJWT.js'
import {authorizeRole} from './middlewares/authorizeRole.js'

dotenv.config()

const JWT_SECRET = process.env.SECRET_KEY_JWT
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

let users = [
  {
    id: 1,
    username: 'admin',
    email: 'alex@example.com',
    password: '$qwerty123456zxcvbn$ASDF09876',
    role: 'admin'
  }
]

app.post('/login', async (req, res) => {
  const {username, password} = req.body

  const user = users.find(u => u.username === username)
  if (!user) return res.status(401).json({message: "User not found"})

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return res.status(401).json({message: "Invalid password"})

    const token = jwt.sign(
      {id: user.id, username: user.username, role: user.role},
      JWT_SECRET,
      {expiresIn: '1h'}
    )
    
    res.json({message: 'Login successful', token})
})

app.delete('/delete-account', authenticateJWT, (req, res) => {
  const userId = req.user.id

  const exists = users.find(u => u.id === userId)
  if (!exists) return res.status(404).json({message: "User not found"})

  users = users.filter(u => u.id !== userId)

  res.json({message: "Account deleted successfully"})
})

app.put('/update-role', authenticateJWT, authorizeRole('admin'), (req, res) => {
  const {id, newRole} = req.body

  const user = users.find(u => u.id === id)
  if (!user) return res.status(404).json({message: "User not found"})

    user.role = newRole

    res.json({message: "Role updated", user})
})

app.post('/refresh-token', authenticateJWT, (req, res) => {
  const {id, username, role} = req.user

  const newToken = jwt.sign(
    {id, username, role},
    JWT_SECRET,
    {expiresIn: '1h'}
  )

  res.json({message: "Token refreshed", token: newToken})
})

app.listen(PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})