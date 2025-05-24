'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Razas', [
      { nombre: 'humano', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'elfo', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'elfo_oscuro', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'enano', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'gnomo', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Razas', null, {});
  }
};
