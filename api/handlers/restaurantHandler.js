const Restaurant = require("../../DB/models/restaurant");
const Menu = require("../../DB/models/menu");

const getRestaurantsHandler = function(cb) {
  Restaurant.find({})
    .populate("chef")
    // .populate("menu")
    .exec((error, docs) => {
      if (error || docs.length === 0) {
        return cb(error);
      } else {
        cb(null, docs);
      }
    });
};

const getMenuHandler = async (menuId, cb) => {
  Menu.findOne(
    {
      _id: menuId
    },
    {
      __v: false
    }
  )
    .populate("breakfast")
    .populate("lunch")
    .populate("dinner")
    .exec(cb);
};

const getRestaurantsByChefHandler = function(cb) {
  Restaurant.find({})
    .populate("chef")
    .exec(cb);
};

module.exports = {
  getRestaurantsHandler,
  getRestaurantsByChefHandler,
  getMenuHandler
};
