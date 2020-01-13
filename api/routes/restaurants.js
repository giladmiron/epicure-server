var express = require('express');
var router = express.Router();

var { getRestaurantsController, getRestaurantsByChefController, getMenuController, createRestaurantController } = require('../controllers/restaurantsController');

router.get('/restaurants', getRestaurantsController)
router.get('/menu/:restaurantId', getMenuController)
router.post('/restaurant', createRestaurantController)

//need to decide if the filtering is on the
//back/front side
router.get('/restaurants/:chef', getRestaurantsByChefController)


module.exports = router;
