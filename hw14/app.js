import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import Category from "./models/Category.js"
import Product from "./models/Product.js"

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Успешное подключение")
  } catch (error) {
    console.log("Ошибка подключения", error)
  }
}

connectDB()

app.post("/categories", async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name
    })
    await category.save()
    res.status(200).json(category)
  } catch(error) {
    res.status(400).json({error: error.message})
  }
})

app.post("/products", async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    })
    await product.save()
    res.status(200).json(product)
  } catch {
    res.status(400).json({error: error.message})
  }
})

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find().populate("category")
    res.json(products)
  } catch {
    res.status(500).json({error: error.message})
  }
})

app.listen(PORT, () =>
console.log(`Сервер запущен на порту ${PORT}`))
