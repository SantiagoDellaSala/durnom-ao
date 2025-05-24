"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Personaje extends Model {
    static associate(models) {
      Personaje.belongsTo(models.User, { foreignKey: "userId" });
      Personaje.belongsTo(models.Bando, { foreignKey: "bandoId" });
      Personaje.belongsTo(models.Clase, { foreignKey: "claseId" });
      Personaje.belongsTo(models.Raza, { foreignKey: "razaId" });
      Personaje.hasMany(models.Inventario, { foreignKey: "personajeId" });
    }
  }
  Personaje.init(
    {
      userId: DataTypes.INTEGER,
      nick_name: DataTypes.STRING,
      nivel: DataTypes.INTEGER,
      experiencia: DataTypes.INTEGER,
      bandoId: DataTypes.INTEGER,
      claseId: DataTypes.INTEGER,
      razaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Personaje",
    }
  );
  return Personaje;
};
