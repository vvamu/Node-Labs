const Turtle = require("../context").turtles;
const Weapon = require("../context").weapons;
const Pizza = require("../context").pizzas;
const Sequelize = require("../context").Sequelize;
const errors = require("../helpers/errors");
const path = require("path");

module.exports = {
  getAllTurtles: async () => {
    return Turtle.findAll();
  },

  getTurtleById: async (id) => {
    if(typeof id !== 'number') return null ;


    const turtle = await Turtle.findByPk(id);
    if (!turtle) {
      throw new Error("Turtle not found");
    }

    return turtle;
  },

  getTurtlesByFavoritePizza: async (pizzaName) => {
    const turtles = await Turtle.findAll({
      include: [
        {
          model: Pizza,
          as: "favoritePizza",
          where: { name: { [Sequelize.Op.iLike]: `%${pizzaName}%` } },
        },
      ],
    });

    return turtles;
  },

  getTurtlesByFavoritePizzaName: async (pizzaName) => {
    const pizzass = await Pizza.findAll({
      where: { 
        name: pizzaName//{ match: { pattern: pizzaName, insensitive : true,}} 
      }
    });

    // Extract the IDs of the pizzas
    const favoritePizzaIds = pizzass.map(pizza => pizza.id);

    // Find the turtles with favorite pizzas matching the IDs
    const turtles = await Turtle.findAll({
      where: { favoritePizzaId: favoritePizzaIds }
    });

    return turtles;
  },

  createTurtle: async (turtleData) => {
    const {
      name,
      color,
      weaponId,
      favoritePizzaId,
      secondFavoritePizzaId,
      image,
    } = turtleData;

    if (!name || !color) {
      throw new Error("Name and color are required");
    }

    const weapon = await Weapon.findByPk(weaponId);
    if (weaponId && !weapon) {
      throw new Error("Invalid weaponId");
    }

    const favoritePizza = await Pizza.findByPk(favoritePizzaId);
    if (favoritePizzaId && !favoritePizza) {
      throw new Error("Invalid favoritePizzaId");
    }

    const secondFavoritePizza = await Pizza.findByPk(secondFavoritePizzaId);
    if (secondFavoritePizzaId && !secondFavoritePizza) {
      throw new Error("Invalid secondFavoritePizzaId");
    }

    const turtle = await Turtle.create({
      name,
      color,
      weaponId,
      favoritePizzaId,
      secondFavoritePizzaId,
      image,
    });

    return turtle;
  },

  updateTurtleById: async (turtleData) => {
    /*if (!Number.isInteger(turtleData.id)) {
      throw new Error("Invalid id");
    }*/
    const turtle = await Turtle.findByPk(turtleData.id);
    if (!turtle) {
      throw new Error("Turtle not found");
    }

    const {
      name,
      color,
      weaponId,
      favoritePizzaId,
      secondFavoritePizzaId,
      image,
    } = turtleData;

    if (!name || !color) {
      throw new Error("Name and color are required");
    }

    turtle.name = name;
    turtle.color = color;

    if (weaponId) {
      const weapon = await Weapon.findByPk(weaponId);
      if (!weapon) {
        throw new Error("Invalid weaponId");
      }
      turtle.weaponId = weaponId;
    }
    if (favoritePizzaId) {
      const favoritePizza = await Pizza.findByPk(favoritePizzaId);
      if (!favoritePizza) {
        throw new Error("Invalid favoritePizzaId");
      }
      turtle.favoritePizzaId = favoritePizzaId;
    }
    if (secondFavoritePizzaId) {
      const secondFavoritePizza = await Pizza.findByPk(secondFavoritePizzaId);
      if (!secondFavoritePizza) {
        throw new Error("Invalid secondFavoritePizzaId");
      }
      turtle.secondFavoritePizzaId = secondFavoritePizzaId;
    }
    if (image) {
      turtle.image = image;
    }

    await turtle.save();
    return turtle;
  },

  deleteTurtleById: async (turtleData) => {
    if (!Number.isInteger(turtleData.id)) {
      throw new Error("Invalid id");
    }

    const turtle = await Turtle.findByPk(turtleData.id);
    if (!turtle) {
      throw new Error("Turtle not found");
    }

    await turtle.destroy();
    return turtle;
  },

  bindFavoritePizza: async (Data, isSecondFavorite = false) => {
    const { turtleId, pizzaId } = Data;

    const turtle = await Turtle.findByPk(turtleId);
    if (!turtle) {
      throw new Error("Turtle not found");
    }

    const pizza = await Pizza.findByPk(pizzaId);
    if (!pizza) {
      throw new Error("Pizza not found");
    }

    if (!isSecondFavorite) {
      turtle.favoritePizzaId = pizzaId;
    } else {
      turtle.secondFavoritePizzaId = pizzaId;
    }

    await turtle.save();
    return turtle;
  },

  unbindFavoritePizza: async (Data, isSecondFavorite = false) => {
    const { turtleId } = Data;

    const turtle = await Turtle.findByPk(turtleId);
    if (!turtle) {
      throw new Error("Turtle not found");
    }

    if (!isSecondFavorite) {
      turtle.favoritePizzaId = null;
    } else {
      turtle.secondFavoritePizzaId = null;
    }

    await turtle.save();
    return turtle;
  },

  bindWeaponToTurtle: async (Data) => {
    const { turtleId, weaponId } = Data;
    const turtle = await Turtle.findByPk(turtleId);
    if (!turtle) {
      throw new Error("Turtle not found");
    }
    const weapon = await Weapon.findByPk(weaponId);
    if (!weapon) {
      throw new Error("Weapon not found");
    }
    await turtle.setWeapon(weapon);
    return turtle;
  },

  unbindWeapon: async (Data) => {
    const turtleId = Data.turtleId;

    const turtle = await Turtle.findByPk(turtleId);
    if (!turtle) {
      throw new Error("Turtle not found");
    }
    await turtle.setWeapon(null);
    return turtle;
  },

  uploadTurtleImage: async (Data) => {
    const turtleId = Data.body.turtleId;
    const turtle = await Turtle.findByPk(turtleId);

    if (!turtle) {
      throw new Error("Turtle not found");
    }

    const fileName = `images/turtle_${turtleId}.jpeg`;
    let fileData   = Data.file;
    
    // Move the uploaded image to our upload folder
   /* image.mv(`images/${fileName}`, (error) => {
      if (error) {
        throw new Error("Error with saving photo");
      } else {
        const result = turtle.update(
          { image: fileName },
          { where: { id: turtleId } }
        ); 
        return  result[0];
      }
    });*/

    const result = turtle.update(
      { image: fileName },
      { where: { id: turtleId } }
    ); 
    const turt = Turtle.findByPk(turtleId);

    return turt;

/*
    if (result[0]) {
    } else {
      throw new Error("Internal server error");
    }
    */
  },
};
