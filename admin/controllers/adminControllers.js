var {
  createUserHandler,
  loginHandler,
  createRestaurantHandler,
  deleteRestaurantHandler
} = require("../handlers/adminHandlers");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUserController = async function(req, res) {
  try {
    createUserHandler(req.body, err => {
      if (err) {
        res
          .status(400)
          .send("an error was accured, email may be allready exists");
      } else {
        res.status(201).json("User has been created!");
      }
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const loginController = function(req, res) {
  try {
    loginHandler(req.body, err => {
      if (err) {
        res.sendStatus(403);
      } else {
        const token = jwtGenerator(req.body.email);
        res.status(200).json(token);
      }
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const createRestaurantController = function(req, res) {
  const restaurant = req.body;
  try {
    createRestaurantHandler(restaurant, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(response);
      }
    });
  } catch (e) {
    res.sendStatus(500);
  }
};

const deleteRestaurantController = function(req, res) {
  try {
    deleteRestaurantHandler(req.params.resId, (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(response);
      }
    });
  } catch (e) {
    res.sendStatus(500);
  }
};

const jwtGenerator = function(email) {
  const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
};

module.exports = {
  createUserController,
  loginController,
  createRestaurantController,
  deleteRestaurantController
};
