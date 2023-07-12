const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define("Weapons", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    dps: DataTypes.INTEGER,
  });
};

