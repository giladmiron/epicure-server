const {
  getRestaurantsHandler,
  getRestaurantsByChefHandler,
  getMenuHandler
} = require("../handlers/restaurantHandler");

const getRestaurantsController = function(req, res) {
  try {
    getRestaurantsHandler((err, docs) => {
      if (err || !docs) {
        if (err) res.sendstatus(500).send(err.errmsg);
        else res.sendStatus(204);
      } else res.json(docs);
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const getMenuController = function(req, res) {
  try {
    getMenuHandler(req.params.menuId, (err, doc) => {
      if (err || !doc) {
        if (err) res.sendstatus(500).send(err.errmsg);
        else res.sendStatus(204);
      } else res.json(doc);
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const getRestaurantsByChefController = function(req, res) {
  const chefName = req.params.chef;
  try {
    getRestaurantsByChefHandler((err, docs) => {
      if (err) {
        res.status(500).send(err.errmsg);
      }
      res.json(docs.filter(docs => docs.chef.name === chefName));
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  getRestaurantsController,
  getMenuController,
  getRestaurantsByChefController
};
