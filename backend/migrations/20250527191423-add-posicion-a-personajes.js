'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Personajes', 'posX', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 50
    });
    await queryInterface.addColumn('Personajes', 'posY', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 50
    });
    await queryInterface.addColumn('Personajes', 'mapa', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'mapa1'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Personajes', 'posX');
    await queryInterface.removeColumn('Personajes', 'posY');
    await queryInterface.removeColumn('Personajes', 'mapa');
  }
};
