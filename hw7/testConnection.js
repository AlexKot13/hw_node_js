import sequelize from "./config/db.js";

try {
  await sequelize.authenticate()
  console.log('Подключение успешно!')
} catch (e) {
  console.log('Подключение успешно!', e.message)
}