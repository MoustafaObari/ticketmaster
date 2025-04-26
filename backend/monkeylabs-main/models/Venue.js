const mongoose = require('mongoose');

const venuesSchema = new mongoose.Schema({
  venue_name: String,
  location: String,
});

module.exports = mongoose.model('Venues', venuesSchema);