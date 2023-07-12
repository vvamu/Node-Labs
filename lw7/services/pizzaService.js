const Sequelize = require("../context").Sequelize;
const sequelize = require("../context").sequelize;
const Pizza = require("../context").pizzas;
const { name } = require("tedious/lib/data-types/null");
const errors = require("../helpers/errors");
const pizza = require("../models/pizza");

  module.exports = {
    getAll: async () => {
      return Pizza.findAll();
    },

  getById: async (pizzaId) => {
    //if(typeof pizzaId !== 'number') throw errors.invalidInput;
    const pizza = await Pizza.findByPk(parseInt(pizzaId));
    if (!pizza) throw errors.entityNotFound;

    return pizza;
  },

  getPizzasByCalories: async (data) => {
    const { calories } = data;
    if (!calories) {
      throw errors.invalidInput("Please provide calories");
    }
    let query;
    const caloriesNum = Number(calories.slice(2));
    if (calories.startsWith("gt")) {
      query = { where: { calories: { [Sequelize.Op.gt]: caloriesNum } } };
    } else if (calories.startsWith("lt")) {
      query = { where: { calories: { [Sequelize.Op.lt]: caloriesNum } } };
    } else {
      throw errors.invalidInput("Invalid query parameter");
    }
    const pizzas = await Pizza.findAll(query);
    return pizzas;
  },

  createPizza: async (pizzaData) => {
    const { name, calories } = pizzaData;

    if (!name || !calories) {
      throw new Error("Name and calories are required");
    }

    if (calories > 2000) {
      throw new Error("Calories must not exceed 2000");
    }

    const pizza = await Pizza.create({
      name,
      calories,
    });

    return pizza;
  },

  updatePizzaById: async (pizzaData) => {
    const pizza = await Pizza.findByPk(parseInt(pizzaData.id));
    if (!pizza) {
      throw new Error("Pizza not found");
    }

    const { name, calories } = pizzaData;

    if (name) {
      pizza.name = name;
    }
    if (calories) {
      if (calories > 2000) {
        throw new Error("Calories must not exceed 2000");
      }
      pizza.calories = calories;
    }

    await pizza.save();
    return pizza;
  },

  deletePizzaById: async (id) => {
    if (!Number.isInteger(id)) {
      throw new Error("Invalid id");
    }

    const pizza = await Pizza.findByPk(id);
    if (!pizza) {
      throw new Error("Pizza not found");
    }

    await pizza.destroy();
    return pizza;
  },

  updateSuperFatPizzas: async () => {
    const t = await sequelize.transaction();

    await Pizza.update(
        { name: pizza.name },
        { where: { calories: { [Sequelize.Op.lt]: 1500 } }, transaction: t }
    );

    await t.commit();
    return Pizza.findAll;
  },
};
