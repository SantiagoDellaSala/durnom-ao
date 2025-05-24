"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bando extends Model {
    static associate(models) {
      Bando.hasMany(models.Personaje, { foreignKey: "bandoId" });
    }
  }
  Bando.init(
    {
      nombre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bando",
    }
  );
  return Bando;
};
