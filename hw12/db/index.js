import { MongoClient } from "mongodb"
import dotenv from 'dotenv'

dotenv.config()

const client = new MongoClient(process.env.MONGO_URL)

let db

async function  connectDB() {
  try {
    await client.connect()
    db = client.db()
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.log('Problems with connection', error)
    throw error
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not connected')
  }
  return db
}

export {connectDB, getDB}