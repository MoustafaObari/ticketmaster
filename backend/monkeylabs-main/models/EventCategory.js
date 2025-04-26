const mongoose = require('mongoose');

const eventCategoriesSchema = new mongoose.Schema({
  event_id: String,
  category_id: String,
});

module.exports = mongoose.model('EventCategories', eventCategoriesSchema);