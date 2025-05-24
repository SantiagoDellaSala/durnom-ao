"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clase.hasMany(models.Personaje, { foreignKey: "claseId" });
    }
  }
  Clase.init(
    {
      nombre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Clase",
    }
  );
  return Clase;
};
