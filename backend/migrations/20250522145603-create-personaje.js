'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Personajes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nick_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nivel: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      experiencia: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      bandoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Bandos',
          key: 'id'
        }
      },
      claseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clases',
          key: 'id'
        }
      },
      razaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Razas',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Personajes');
  }
};
