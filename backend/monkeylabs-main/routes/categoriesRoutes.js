const express = require('express');
const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

router.get('/api/categories', categoriesController.getAllCategories);

router.post('/api/categories', categoriesController.createCategory);

router.put('/api/categories/:id', categoriesController.updateCategory);

router.delete('/api/categories', categoriesController.deleteAllCategories);

module.exports = router;