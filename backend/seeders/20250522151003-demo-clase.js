"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Clases",
      [
        { nombre: "mago", createdAt: new Date(), updatedAt: new Date() },
        { nombre: "paladin", createdAt: new Date(), updatedAt: new Date() },
        { nombre: "asesino", createdAt: new Date(), updatedAt: new Date() },
        { nombre: "guerrero", createdAt: new Date(), updatedAt: new Date() },
        { nombre: "arquero", createdAt: new Date(), updatedAt: new Date() },
        { nombre: "clérigo", createdAt: new Date(), updatedAt: new Date() },
        { nombre: "bardo", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Clases", null, {});
  },
};
