const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema({
  order_id: String,
  ticket_id: String,
  quantity: Number,  
});

module.exports = mongoose.model('OrderItems', orderItemsSchema);