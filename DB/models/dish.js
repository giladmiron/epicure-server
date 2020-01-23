const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: { type: String, required: true },
  ingradients: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  icons: []
});

// exports.schema = dishSchema;
module.exports = mongoose.model("dish", dishSchema);
