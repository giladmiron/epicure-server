var express = require("express");
var router = express.Router();

var {
  getRestaurantsController,
  getRestaurantsByChefController,
  getMenuController,
} = require("../controllers/restaurantsController");

router.get("/restaurants", getRestaurantsController);
router.get("/menu/:menuId", getMenuController);

//need to decide if the filtering is on the
//back/front side
router.get("/restaurants/:chef", getRestaurantsByChefController);

module.exports = router;
