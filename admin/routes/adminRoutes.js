var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var {
  loginController,
  createUserController,
  createRestaurantController,
  deleteRestaurantController
} = require("../controllers/adminControllers");

router.post("/createuser", createUserController);
router.post("/login", loginController);
router.post("/restaurant", verifyToken, createRestaurantController);
router.delete("/delete/:resId", verifyToken, deleteRestaurantController);

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == "null") {
    return res.status(401).send("Unauthorized request");
  }
  jwt.verify(
    JSON.parse(token),
    process.env.ACCESS_TOKEN_SECRET,
    (err, decode) => {
      if (err) {
        return res.status(401).send("Unauthorized request");
      } else {
        req.user = decode;
        next();
      }
    }
  );
}

module.exports = router;
