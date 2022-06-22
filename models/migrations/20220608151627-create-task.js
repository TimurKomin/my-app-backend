'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()')
      },
      title: {
        unique:true,
        type: Sequelize.STRING
      },
      done: {
        type: Sequelize.BOOLEAN, 
        defaultValue: false
      },
      createdAt: {
        defaultValue: Sequelize.literal('now()'),
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'

      },
      updatedAt: {
        defaultValue: Sequelize.literal('now()'),
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};