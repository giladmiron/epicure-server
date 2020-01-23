const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chefSchema = new Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  img: { type: String, required: true }
});

// exports.schema = dishSchema;
module.exports = mongoose.model("chef", chefSchema);
