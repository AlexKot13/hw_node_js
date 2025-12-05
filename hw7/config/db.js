import { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const configPath = path.resolve('./config/config.json')
const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

const env = process.env.NODE_ENV || 'development'
const config = configData[env]
console.log(config)

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { host: config.host, dialect: config.dialect }
)

export default sequelize
