const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')

const menuModel = require('./menu')
const chefModel = require('./chef')

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  chef: { type: Schema.Types.ObjectId, ref: chefModel, required: true },
  img: { type: String, required: true },
  menu: { type: Schema.Types.ObjectId, ref: menuModel, required: true },
  date: { type: String, default: moment().format('L') },
});


// exports.schema = restaurantSchema;
module.exports = mongoose.model('restaurant', restaurantSchema);
