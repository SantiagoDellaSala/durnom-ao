"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Bandos",
      [
        { nombre: "fiel_al_rey", createdAt: new Date(), updatedAt: new Date() },
        {
          nombre: "fiel_a_lordthek",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bandos", null, {});
  },
};
