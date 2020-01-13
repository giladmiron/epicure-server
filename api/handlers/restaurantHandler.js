const Restaurant = require('../../DB/models/restaurant')
const Menu = require('../../DB/models/menu')
const Dish = require('../../DB/models/dish')
const Chef = require('../../DB/models/chef')

const getRestaurantsHandler = function (cb) {
    Restaurant.find({}).populate('chef').populate('menu').exec((error, docs) => {
        if (error || docs.length === 0) {
            return cb(error)
        } else {
            cb(null, docs)
        }
    })
}

const getMenuHandler = async (restaurantId, cb) => {
    Restaurant.findOne({
        _id: restaurantId
    }).populate('menu').exec(cb)
}

const createRestaurantHandler = function (restaurant, cb) {
    let c1 = new Chef({ name: 'Netanel', about: 'QA', img: "https://picsum.photos/400" })
    let m1 = new Menu({ breakfast: [], lunch: [], dinner: [] })

    let d1 = new Dish({ name: "some dish", ingradients: "some ingradients", img: "https://picsum.photos/400", price: 99 })
    let d2 = new Dish({ name: "some dish", ingradients: "some ingradients", img: "https://picsum.photos/400", price: 99 })
    let d3 = new Dish({ name: "some dish", ingradients: "some ingradients", img: "https://picsum.photos/400", price: 99 })
    let d4 = new Dish({ name: "some dish", ingradients: "some ingradients", img: "https://picsum.photos/400", price: 99 })
    let d5 = new Dish({ name: "some dish", ingradients: "some ingradients", img: "https://picsum.photos/400", price: 99 })
    let d6 = new Dish({ name: "some dish", ingradients: "some ingradients", img: "https://picsum.photos/400", price: 99 })
    let d7 = new Dish({ name: "some dish", ingradients: "some ingradients", img: "https://picsum.photos/400", price: 99 })
    let d8 = new Dish({ name: "some dish", ingradients: "some ingradients", img: "https://picsum.photos/400", price: 99 })
    let d9 = new Dish({ name: "some dish", ingradients: "some ingradients", img: "https://picsum.photos/400", price: 99 })
    let d10 = new Dish({ name: "some dish", ingradients: "some ingradients", img: "https://picsum.photos/400", price: 99 })
    let d11 = new Dish({ name: "some dish", ingradients: "some ingradients", img: "https://picsum.photos/400", price: 99 })
    let d12 = new Dish({ name: "some dish", ingradients: "some ingradients", img: "https://picsum.photos/400", price: 99 })

    let breakfast = [d1, d2, d3, d4]
    breakfast.forEach(dish => {
        dish.save((err, res) => {
            m1.breakfast.push(res)
        })
    })
    let lunch = [d5, d6, d7, d8]
    lunch.forEach(dish => {
        dish.save((err, res) => {
            m1.lunch.push(res)
        })
    })
    let dinner = [d9, d10, d11, d12]
    dinner.forEach(dish => {
        dish.save((err, res) => {
            m1.dinner.push(res)
        })
    })

    let r1 = new Restaurant(restaurant)

    c1.save(() => {
        r1.chef = c1
        m1.save(() => {
            r1.menu = m1
            r1.save(cb)
        })
    })
}

const getRestaurantsByChefHandler = function (cb) {
    Restaurant.find({}).populate('chef').exec(cb)
}

module.exports = {
    getRestaurantsHandler,
    getRestaurantsByChefHandler,
    getMenuHandler,
    createRestaurantHandler
}