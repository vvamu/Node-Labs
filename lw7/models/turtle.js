//const { Sequelize, DataTypes, Model } = require('sequelize');
//const sequelize = new Sequelize('oracle://node_user:qwerty@localhost:1521/orcl');


module.exports = (Sequelize, sequelize) => {
  return sequelize.define("Turtles", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    color: Sequelize.STRING,
    image: Sequelize.STRING,
  });
};


/*
class Turtles extends Model {}

Turtles.init({
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  image: Sequelize.STRING,
}, //{ sequelize }
{ sequelize,
  modelName : 'Turtles'}
);

module.exports = Turtles;
*/