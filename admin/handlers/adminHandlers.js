const Auth = require("../../DB/models/authModels/normalAuth");
const bcrypt = require("bcryptjs");

const Dish = require("../../DB/models/dish");
const Chef = require("../../DB/models/chef");
const Menu = require("../../DB/models/menu");
const Restaurant = require("../../DB/models/restaurant");

const createUserHandler = async function(user, cb) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new Auth({ email: user.email, password: hashedPassword });
  newUser.save(err => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};

const loginHandler = function(user, cb) {
  Auth.findOne({ email: user.email }, async (err, doc) => {
    if (err || !doc) {
      cb("error");
    } else if (user.email !== "giladm@moveo.co.il") {
      cb("error");
    } else {
      if (await bcrypt.compare(user.password, doc.password)) {
        cb();
      } else {
        cb("error");
      }
    }
  });
};

const createRestaurantHandler = function(restaurant, cb) {
  if (!restaurant.isChefExist) {
    var c1 = new Chef({
      name: restaurant.chefName,
      about: restaurant.chefAbout,
      img: restaurant.chefImg
    });
  }

  let m1 = new Menu({ breakfast: [], lunch: [], dinner: [] });
  let dishes = [];
  for (let i = 0; i < 12; i++) {
    let d = new Dish({
      name: "dish",
      ingradients: "ingradients",
      img: "https://picsum.photos/400",
      price: 100
    });
    dishes.push(d);
  }

  let breakfast = [dishes[0], dishes[1], dishes[2], dishes[3]];
  breakfast.forEach(async dish => {
    await dish.save((err, res) => {
      m1.breakfast.push(res);
    });
  });
  let lunch = [dishes[4], dishes[5], dishes[6], dishes[7]];
  lunch.forEach(async dish => {
    await dish.save((err, res) => {
      m1.lunch.push(res);
    });
  });
  let dinner = [dishes[8], dishes[9], dishes[10], dishes[11]];
  dinner.forEach(async dish => {
    await dish.save((err, res) => {
      m1.dinner.push(res);
    });
  });

  let r1 = new Restaurant({
    name: restaurant.restaurantName,
    img: restaurant.restaurantImg
  });

  if (restaurant.isChefExist) {
    r1.chef = restaurant.chefId;
    m1.save(() => {
      r1.menu = m1;
      r1.save(cb);
    });
  } else {
    c1.save(() => {
      r1.chef = c1;
      m1.save(() => {
        r1.menu = m1;
        r1.save(cb);
      });
    });
  }
};

const deleteRestaurantHandler = function(id, cb) {
  Restaurant.findByIdAndDelete(id, (err, doc) => {
    if (err) cb(err);
    let menuId = doc.menu;
    Menu.findByIdAndDelete(menuId, (err, doc) => {
      if (err) cb(err);
      else cb(null, doc);
    });
  });
};

module.exports = {
  createUserHandler,
  loginHandler,
  createRestaurantHandler,
  deleteRestaurantHandler
};
