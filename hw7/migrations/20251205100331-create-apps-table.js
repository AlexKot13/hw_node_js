'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('App', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allownull: false
    },
    name: {
      type: Sequelize.STRING,
      allownull:false
    },
    size: {
      type: Sequelize.INTEGER,
      allownull: false
    }
  })
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('App')
}