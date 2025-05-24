"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Raza extends Model {
    static associate(models) {
      Raza.hasMany(models.Personaje, { foreignKey: "razaId" });
    }
  }
  Raza.init(
    {
      nombre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Raza",
    }
  );
  return Raza;
};
