const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const normal_auth = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("auth", normal_auth);
