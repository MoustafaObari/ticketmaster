const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  category_name: String,
});

module.exports = mongoose.model('Category', categoriesSchema);