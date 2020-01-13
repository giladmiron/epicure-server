const { getRestaurantsHandler, getRestaurantsByChefHandler, getMenuHandler, createRestaurantHandler } = require('../handlers/restaurantHandler')

const getRestaurantsController = function (req, res) {
    try {

        getRestaurantsHandler((err, docs) => {
            if (err) res.status(500).send(err.errmsg)
            else {
                res.send(docs)
            }
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const getMenuController = function (req, res) {
    try {
        getMenuHandler(req.params.restaurantId, (err, doc) => {
            if (err || !restaurant) res.status(500).send(err.errmsg)

            res.send(doc.menu)
        })

    } catch (e) {
        res.status(500).send(e.message)
    }
}

const createRestaurantController = function (req, res) {
    const restaurant = req.body
    try {
        createRestaurantHandler(restaurant, (err, response) => {
            if (err) {
                res.status(500).send(err.errmsg)
            }
            res.send(response)
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const getRestaurantsByChefController = function (req, res) {
    const chefName = req.params.chef
    try {
        getRestaurantsByChefHandler((err, docs) => {
            if (err) {
                res.status(500).send(err.errmsg)
            }
            res.send(docs.filter(docs => docs.chef.name === chefName))
        })
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = {
    getRestaurantsController,
    getMenuController,
    createRestaurantController,
    getRestaurantsByChefController
}