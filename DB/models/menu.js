const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dishModel = require("./dish");

const menuSchema = new Schema({
  breakfast: {
    type: [{ type: Schema.Types.ObjectId, ref: dishModel }],
    required: true
  },
  lunch: {
    type: [{ type: Schema.Types.ObjectId, ref: dishModel }],
    required: true
  },
  dinner: {
    type: [{ type: Schema.Types.ObjectId, ref: dishModel }],
    required: true
  }
});

// exports.schema = menuSchema;
module.exports = mongoose.model("menu", menuSchema);
