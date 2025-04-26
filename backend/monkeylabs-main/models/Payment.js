const mongoose = require('mongoose');

const paymentsSchema = new mongoose.Schema({
  order_id: String,
  payment_date: String,
  payment_status: String,
});

module.exports = mongoose.model('PaymentsItems', paymentsSchema);