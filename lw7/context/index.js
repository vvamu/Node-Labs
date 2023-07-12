const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.db', // Path to your SQLite database file
},/*
  pool: {
    max: 5, // Максимальное количество соединений в пуле
    min: 0, // Минимальное количество соединений в пуле
    acquire: 30000, // Время ожидания (в миллисекундах) при получении соединения из пула
    idle: 10000 // Время (в миллисекундах) простоя соединения в пуле, после которого оно будет удалено
},
}
*/);

/*
(async () => {
  try { await sequelize.authenticate();}
  catch(err) {console.log("Error connection")}})();
*/

/*
const sequelize = new Sequelize('oracle://node_user:qwerty@localhost:1521/orcl');
try {
  sequelize.authenticate();
 console.log('Connection has been established successfully.');
} catch (error) {
 console.error('Unable to connect to the database:', error);
}*/

const Pizzas = require('../models/pizza')(sequelize);
const Turtles = require("../models/turtle")(Sequelize,sequelize);
const Weapons = require("../models/weapon")(sequelize);


Turtles.belongsTo(Weapons, { foreignKey: "weaponId" });
Turtles.belongsTo(Pizzas, {
  as: "favoritePizza",
  foreignKey: "favoritePizzaId",
});
Turtles.belongsTo(Pizzas, {
  as: "secondFavoritePizza",
  foreignKey: "secondFavoritePizzaId",
});

(async () => { 
  await sequelize.sync({ force: true })
  console.log('Все модели были успешно синхронизированы.')
  
  await createTurtleAndWeapon();

  await console.log(await Pizzas.count());
})();

module.exports = {
  pizzas: Pizzas,
  turtles: Turtles,
  weapons: Weapons,
  sequelize,
  Sequelize,
};

async function createTurtleAndWeapon() {
  try {

    // Create a new weapon
    const weapon = await Weapons.create({
      name: 'Katana',
      dps: 100,
    });

    const weapon2 = await Weapons.create({
      name: 'Stick',
      dps: 20,
    });


    const pizza = await Pizzas.create({
      name: 'Margherita',
      calories: 800,
    });

    const pizza2 = await Pizzas.create({
      name: 'Margherita2',
      calories: 1200,
    });

    const turtle = await Turtles.create({
      name: 'Leonardo',
      color: 'Blue',
      weaponId: 1,
      favoritePizzaId: 1,
      secondFavoritePizzaId: 2,
      image: '../images/leonardo.jpeg',
    });

    const turtle2 = await Turtles.create({
      name: 'Rapael',
      color: 'Red',
      weaponId: 1,
      favoritePizzaId: 2,
      secondFavoritePizzaId: 1,
      image: '../images/raphael.jpeg',
    });

    const turtle3 = await Turtles.create({
      name: 'Leonardo3',
      color: 'Blue',
      weaponId: 1,
      favoritePizzaId: 2,
      secondFavoritePizzaId: 1,
      image: '../images/leonardo.jpeg',
    });

    const turtle4 = await Turtles.create({
      name: 'Leonardo4',
      color: 'Blue',
      weaponId: 1,
      favoritePizzaId: 2,
      secondFavoritePizzaId: 1,
      image: '../images/leonardo.jpeg',
    });

  } catch (error) {
    console.error('Error creating turtle and weapon:', error);
  }
}

/*
{
  "name": "Margherita2",
  "calories": 800
}

{
  "name": "Leonardo2",
  "color": "Blue",
  "weaponId": 1,
  "favoritePizzaId": 1,
  "secondFavoritePizzaId": 2,
  "image": "../images/donatello.jpeg"
}


--localhost:3000/api/turtles/weaponBind
{ 
    "turtleId" : "1",
    "weaponId": "1" 
}

--localhost:3000/api/turtles/weaponBind
{ 
    "turtleId" : "1",
    "weaponId": "1" 
}

*/