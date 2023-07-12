const turtlesService = require("../services/turtleService");
const path = require("path");
module.exports = {
  getAllTurtles: async (req, res, next) => {
    try {

    //let turtles = await turtlesService.getAllTurtles();
    //res.render('turtles', {title: 'turles page' ,  turtles : turtles} );
    
    res.json (await turtlesService.getAllTurtles());
     // Get the absolute path to the index.html file
     //const indexPath = path.join(__dirname, '..', 'index.html');
     
     // Send the file as a response
     //res.sendFile(indexPath);

     
    } catch (error) {
      next(error);
    }
  },

  getTurtleById: async (req, res, next) => {
    try {
      res.json(await turtlesService.getTurtleById(parseInt(req.params.id)));
    } catch (error) {
      next(error);
    }
  },

  getTurtlesByFavoritePizza: async (req, res, next) => {
    try {
      res.json(
        await turtlesService.getTurtlesByFavoritePizza(req.query.favoritePizza)
      );
    } catch (error) {
      next(error);
    }
  },

  getTurtlesByFavoritePizzaName: async (req, res, next) => {
    try {
      const turtles = await turtlesService.getTurtlesByFavoritePizzaName(req.query.favoritePizzaName);
      res.json(turtles);
      
    } catch (error) {
      next(error);
  }},

  createTurtle: async (req, res, next) => {
    try {
      res.json(await turtlesService.createTurtle(req.body));
    } catch (error) {
      next(error);
    }
  },

  updateTurtleById: async (req, res, next) => {
    try {
      res.json(await turtlesService.updateTurtleById(req.body));
    } catch (error) {
      next(error);
    }
  },

  deleteTurtleById: async (req, res, next) => {
    try {
      res.json(await turtlesService.deleteTurtleById(req.body));
    } catch (error) {
      next(error);
    }
  },

  bindFavoritePizza: async (req, res, next) => {
    try {
      res.json(await turtlesService.bindFavoritePizza(req.body));
    } catch (error) {
      next(error);
    }
  },

  bindSecondFavoritePizza: async (req, res, next) => {
    try {
      res.json(await turtlesService.bindFavoritePizza(req.body, true));
    } catch (error) {
      next(error);
    }
  },

  unbindFavoritePizza: async (req, res, next) => {
    try {
      res.json(await turtlesService.unbindFavoritePizza(req.body));
    } catch (error) {
      next(error);
    }
  },

  unbindSecondFavoritePizza: async (req, res, next) => {
    try {
      res.json(await turtlesService.unbindFavoritePizza(req.body, true));
    } catch (error) {
      next(error);
    }
  },

  bindWeapon: async (req, res, next) => {
    try {
      res.json(await turtlesService.bindWeaponToTurtle(req.body));
    } catch (error) {
      next(error);
    }
  },

  unbindWeapon: async (req, res, next) => {
    try {
      res.json(await turtlesService.unbindWeapon(req.body));
    } catch (error) {
      next(error);
    }
  },

  uploadTurtleImage: async (req, res, next) => {
    try {
      res.json(await turtlesService.uploadTurtleImage(req));
    } catch (error) {
      next(error);
    }
  },
};
