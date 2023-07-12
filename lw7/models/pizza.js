
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pizza = sequelize.define('Pizzas', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    calories: DataTypes.DOUBLE,
  }
  );

  return Pizza;
};



//------------------------
/*
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.db', // Path to your SQLite database file
});

class Pizzas extends Model {}

Pizzas.init({
 id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    calories: DataTypes.DOUBLE,
}, //{ sequelize }
{ sequelize,
  modelName : 'Pizzas'}
);

module.exports = Pizzas;
*/