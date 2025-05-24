"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventario extends Model {
    static associate(models) {
      Inventario.belongsTo(models.Personaje, { foreignKey: "personajeId" });
    }
  }
  Inventario.init(
    {
      personajeId: DataTypes.INTEGER,
      slot: DataTypes.INTEGER,
      item: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Inventario",
    }
  );
  return Inventario;
};
